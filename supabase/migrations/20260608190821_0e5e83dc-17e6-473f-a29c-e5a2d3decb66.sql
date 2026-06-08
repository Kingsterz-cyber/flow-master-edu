
-- ============ ENUMS ============
CREATE TYPE public.app_role AS ENUM ('director','dos','teacher','student');
CREATE TYPE public.approval_status AS ENUM ('pending','approved','rejected');
CREATE TYPE public.gender AS ENUM ('male','female','other');
CREATE TYPE public.attendance_status AS ENUM ('present','absent','late','excused');
CREATE TYPE public.assessment_type AS ENUM ('cat','quiz','practical','exam','assignment','custom');

-- ============ updated_at trigger fn ============
CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER
LANGUAGE plpgsql AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ============ SCHOOLS ============
CREATE TABLE public.schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  country TEXT,
  category TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  teacher_reg_code TEXT NOT NULL UNIQUE,
  student_reg_code TEXT NOT NULL UNIQUE,
  director_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.schools TO authenticated;
GRANT ALL ON public.schools TO service_role;
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_schools_updated BEFORE UPDATE ON public.schools FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ USER ROLES (one row per role per school) ============
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  status public.approval_status NOT NULL DEFAULT 'pending',
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, school_id, role)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- ============ SECURITY DEFINER HELPERS ============
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _school_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND school_id = _school_id AND role = _role AND status = 'approved');
$$;

CREATE OR REPLACE FUNCTION public.is_school_member(_user_id UUID, _school_id UUID)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND school_id = _school_id AND status = 'approved');
$$;

CREATE OR REPLACE FUNCTION public.user_schools(_user_id UUID)
RETURNS SETOF UUID LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT DISTINCT school_id FROM public.user_roles WHERE user_id = _user_id AND status = 'approved';
$$;

-- schools RLS
CREATE POLICY "members see their schools" ON public.schools FOR SELECT TO authenticated
  USING (id IN (SELECT public.user_schools(auth.uid())) OR director_id = auth.uid());
CREATE POLICY "directors update own school" ON public.schools FOR UPDATE TO authenticated
  USING (director_id = auth.uid()) WITH CHECK (director_id = auth.uid());
CREATE POLICY "auth users create school" ON public.schools FOR INSERT TO authenticated
  WITH CHECK (director_id = auth.uid());

-- user_roles RLS
CREATE POLICY "users see own roles" ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), school_id, 'director'));
CREATE POLICY "self insert pending role" ON public.user_roles FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "director manages roles" ON public.user_roles FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), school_id, 'director'));
CREATE POLICY "director deletes roles" ON public.user_roles FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), school_id, 'director'));

-- ============ PROFILES ============
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "view own profile" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "view school members profiles" ON public.profiles FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur1
                 JOIN public.user_roles ur2 ON ur1.school_id = ur2.school_id
                 WHERE ur1.user_id = auth.uid() AND ur2.user_id = profiles.id AND ur1.status='approved'));
CREATE POLICY "insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "update own profile" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid());

-- auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email), NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============ ACADEMIC STRUCTURE ============
CREATE TABLE public.academic_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.academic_categories TO authenticated;
GRANT ALL ON public.academic_categories TO service_role;
ALTER TABLE public.academic_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "members read categories" ON public.academic_categories FOR SELECT TO authenticated
  USING (public.is_school_member(auth.uid(), school_id));
CREATE POLICY "director writes categories" ON public.academic_categories FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), school_id, 'director'))
  WITH CHECK (public.has_role(auth.uid(), school_id, 'director'));

CREATE TABLE public.academic_levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.academic_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.academic_levels TO authenticated;
GRANT ALL ON public.academic_levels TO service_role;
ALTER TABLE public.academic_levels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "members read levels" ON public.academic_levels FOR SELECT TO authenticated
  USING (public.is_school_member(auth.uid(), school_id));
CREATE POLICY "director writes levels" ON public.academic_levels FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), school_id, 'director'))
  WITH CHECK (public.has_role(auth.uid(), school_id, 'director'));

CREATE TABLE public.classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  level_id UUID NOT NULL REFERENCES public.academic_levels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  class_teacher_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (school_id, code)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.classes TO authenticated;
GRANT ALL ON public.classes TO service_role;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "members read classes" ON public.classes FOR SELECT TO authenticated
  USING (public.is_school_member(auth.uid(), school_id));
CREATE POLICY "director writes classes" ON public.classes FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), school_id, 'director'))
  WITH CHECK (public.has_role(auth.uid(), school_id, 'director'));

-- ============ DEPARTMENTS + SUBJECTS ============
CREATE TABLE public.departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.departments TO authenticated;
GRANT ALL ON public.departments TO service_role;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "members read depts" ON public.departments FOR SELECT TO authenticated
  USING (public.is_school_member(auth.uid(), school_id));
CREATE POLICY "director writes depts" ON public.departments FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), school_id, 'director'))
  WITH CHECK (public.has_role(auth.uid(), school_id, 'director'));

CREATE TABLE public.subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.subjects TO authenticated;
GRANT ALL ON public.subjects TO service_role;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "members read subjects" ON public.subjects FOR SELECT TO authenticated
  USING (public.is_school_member(auth.uid(), school_id));
CREATE POLICY "director writes subjects" ON public.subjects FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), school_id, 'director'))
  WITH CHECK (public.has_role(auth.uid(), school_id, 'director'));

-- teacher↔subject↔class assignment
CREATE TABLE public.subject_teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (teacher_id, subject_id, class_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.subject_teachers TO authenticated;
GRANT ALL ON public.subject_teachers TO service_role;
ALTER TABLE public.subject_teachers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "members read sub_teachers" ON public.subject_teachers FOR SELECT TO authenticated
  USING (public.is_school_member(auth.uid(), school_id));
CREATE POLICY "director or dos writes sub_teachers" ON public.subject_teachers FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), school_id, 'director') OR public.has_role(auth.uid(), school_id, 'dos'))
  WITH CHECK (public.has_role(auth.uid(), school_id, 'director') OR public.has_role(auth.uid(), school_id, 'dos'));

-- ============ TEACHER PROFILE ============
CREATE TABLE public.teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
  is_class_teacher BOOLEAN NOT NULL DEFAULT false,
  assigned_class_id UUID REFERENCES public.classes(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, school_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.teachers TO authenticated;
GRANT ALL ON public.teachers TO service_role;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "members read teachers" ON public.teachers FOR SELECT TO authenticated
  USING (public.is_school_member(auth.uid(), school_id));
CREATE POLICY "self insert teacher" ON public.teachers FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "self or director update teacher" ON public.teachers FOR UPDATE TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), school_id, 'director'));
CREATE POLICY "director delete teacher" ON public.teachers FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), school_id, 'director'));

-- ============ ENROLLMENT CODES (class-level) ============
CREATE TABLE public.enrollment_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  code TEXT NOT NULL UNIQUE,
  used BOOLEAN NOT NULL DEFAULT false,
  used_by UUID REFERENCES auth.users(id),
  used_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.enrollment_codes TO authenticated;
GRANT ALL ON public.enrollment_codes TO service_role;
-- allow anon SELECT only when used=false (for signup lookup)
GRANT SELECT ON public.enrollment_codes TO anon;
ALTER TABLE public.enrollment_codes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "members read codes" ON public.enrollment_codes FOR SELECT TO authenticated
  USING (public.is_school_member(auth.uid(), school_id));
CREATE POLICY "anon read unused code by exact match" ON public.enrollment_codes FOR SELECT TO anon
  USING (used = false);
CREATE POLICY "class teacher or director creates codes" ON public.enrollment_codes FOR INSERT TO authenticated
  WITH CHECK (
    public.has_role(auth.uid(), school_id, 'director')
    OR EXISTS (SELECT 1 FROM public.classes c WHERE c.id = class_id AND c.class_teacher_id = auth.uid())
  );
CREATE POLICY "class teacher or director updates codes" ON public.enrollment_codes FOR UPDATE TO authenticated
  USING (
    public.has_role(auth.uid(), school_id, 'director')
    OR EXISTS (SELECT 1 FROM public.classes c WHERE c.id = class_id AND c.class_teacher_id = auth.uid())
  );

-- ============ STUDENTS ============
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  class_id UUID REFERENCES public.classes(id) ON DELETE SET NULL,
  enrollment_code TEXT,
  first_name TEXT NOT NULL,
  middle_name TEXT,
  last_name TEXT NOT NULL,
  gender public.gender,
  date_of_birth DATE,
  nationality TEXT,
  photo_url TEXT,
  phone TEXT,
  email TEXT,
  country TEXT, province TEXT, district TEXT, sector TEXT, cell TEXT, village TEXT, address TEXT,
  father_name TEXT, mother_name TEXT,
  guardian_name TEXT, guardian_phone TEXT, guardian_email TEXT, guardian_occupation TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, school_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.students TO authenticated;
GRANT ALL ON public.students TO service_role;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_students_updated BEFORE UPDATE ON public.students FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX idx_students_class ON public.students(class_id);
CREATE INDEX idx_students_sort ON public.students(school_id, last_name, first_name);

CREATE POLICY "self read student" ON public.students FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "staff read students" ON public.students FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), school_id, 'director')
      OR public.has_role(auth.uid(), school_id, 'dos')
      OR public.has_role(auth.uid(), school_id, 'teacher'));
CREATE POLICY "self insert student" ON public.students FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "self or staff update student" ON public.students FOR UPDATE TO authenticated
  USING (user_id = auth.uid()
      OR public.has_role(auth.uid(), school_id, 'director')
      OR public.has_role(auth.uid(), school_id, 'dos'));
CREATE POLICY "director delete student" ON public.students FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), school_id, 'director'));

-- ============ ASSESSMENTS ============
CREATE TABLE public.assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type public.assessment_type NOT NULL DEFAULT 'cat',
  total_marks NUMERIC NOT NULL DEFAULT 100,
  weight NUMERIC NOT NULL DEFAULT 1,
  term TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.assessments TO authenticated;
GRANT ALL ON public.assessments TO service_role;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "members read assessments" ON public.assessments FOR SELECT TO authenticated
  USING (public.is_school_member(auth.uid(), school_id));
CREATE POLICY "teacher writes own assessments" ON public.assessments FOR ALL TO authenticated
  USING (teacher_id = auth.uid()
      OR public.has_role(auth.uid(), school_id, 'director')
      OR public.has_role(auth.uid(), school_id, 'dos'))
  WITH CHECK (teacher_id = auth.uid()
      OR public.has_role(auth.uid(), school_id, 'director')
      OR public.has_role(auth.uid(), school_id, 'dos'));

-- ============ MARKS ============
CREATE TABLE public.marks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  score NUMERIC NOT NULL,
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (assessment_id, student_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.marks TO authenticated;
GRANT ALL ON public.marks TO service_role;
ALTER TABLE public.marks ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_marks_updated BEFORE UPDATE ON public.marks FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX idx_marks_student ON public.marks(student_id);
CREATE INDEX idx_marks_class_subject ON public.marks(class_id, subject_id);

CREATE POLICY "student reads own marks" ON public.marks FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.students s WHERE s.id = student_id AND s.user_id = auth.uid()));
CREATE POLICY "staff reads marks" ON public.marks FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), school_id, 'director')
      OR public.has_role(auth.uid(), school_id, 'dos')
      OR public.has_role(auth.uid(), school_id, 'teacher'));
CREATE POLICY "teacher writes own marks" ON public.marks FOR ALL TO authenticated
  USING (teacher_id = auth.uid()
      OR public.has_role(auth.uid(), school_id, 'director')
      OR public.has_role(auth.uid(), school_id, 'dos'))
  WITH CHECK (teacher_id = auth.uid()
      OR public.has_role(auth.uid(), school_id, 'director')
      OR public.has_role(auth.uid(), school_id, 'dos'));

-- ============ ATTENDANCE ============
CREATE TABLE public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
  teacher_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  status public.attendance_status NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (student_id, date, subject_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.attendance TO authenticated;
GRANT ALL ON public.attendance TO service_role;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_attendance_class_date ON public.attendance(class_id, date);

CREATE POLICY "student reads own attendance" ON public.attendance FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.students s WHERE s.id = student_id AND s.user_id = auth.uid()));
CREATE POLICY "staff reads attendance" ON public.attendance FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), school_id, 'director')
      OR public.has_role(auth.uid(), school_id, 'dos')
      OR public.has_role(auth.uid(), school_id, 'teacher'));
CREATE POLICY "teacher writes attendance" ON public.attendance FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), school_id, 'teacher')
      OR public.has_role(auth.uid(), school_id, 'director')
      OR public.has_role(auth.uid(), school_id, 'dos'))
  WITH CHECK (public.has_role(auth.uid(), school_id, 'teacher')
      OR public.has_role(auth.uid(), school_id, 'director')
      OR public.has_role(auth.uid(), school_id, 'dos'));

-- ============ ANNOUNCEMENTS ============
CREATE TABLE public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  audience public.app_role[] NOT NULL DEFAULT ARRAY['director','dos','teacher','student']::public.app_role[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.announcements TO authenticated;
GRANT ALL ON public.announcements TO service_role;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "members read announcements" ON public.announcements FOR SELECT TO authenticated
  USING (public.is_school_member(auth.uid(), school_id));
CREATE POLICY "staff writes announcements" ON public.announcements FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), school_id, 'director')
      OR public.has_role(auth.uid(), school_id, 'dos')
      OR public.has_role(auth.uid(), school_id, 'teacher'))
  WITH CHECK (author_id = auth.uid()
      AND (public.has_role(auth.uid(), school_id, 'director')
        OR public.has_role(auth.uid(), school_id, 'dos')
        OR public.has_role(auth.uid(), school_id, 'teacher')));

-- ============ NOTIFICATIONS ============
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT,
  link TEXT,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user reads own notifications" ON public.notifications FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "user updates own notifications" ON public.notifications FOR UPDATE TO authenticated USING (user_id = auth.uid());

-- ============ REALTIME ============
ALTER PUBLICATION supabase_realtime ADD TABLE public.marks;
ALTER PUBLICATION supabase_realtime ADD TABLE public.attendance;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_roles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.announcements;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
