# Fora_App

## Requirements
- Install the [Expo CLI](https://docs.expo.io/get-started/installation/)

## Setup & run locally
### 1. Create new project
Sign up to Supabase - https://app.supabase.io and create a new project. Wait for your database to start.

### 2. Get the URL and Key
Go to the Project Settings (the cog icon), open the API tab, and find your API URL and anon key, you'll need these in the next step.

Create a .env file with the following
```bash
# Update these with your Supabase details from your project settings > API
REACT_NATIVE_SUPABASE_URL=
REACT_NATIVE_SUPABASE_ANON_KEY=
```
Set `REACT_NATIVE_SUPABASE_URL` and `REACT_NATIVE_SUPABASE_ANON_KEY`.

### 3. Install the dependencies & run the project:

Install the dependencies:

```bash
npm i
```

Run the project:

```bash
npm start
```

## About Backend
The following are the sql code for creating the tables used in supa base.

### 1. profiles table
```bash
-- Create a table for Public Profiles
create table profiles (
  id uuid references auth.users not null,
  updated_at timestamp with time zone,
  username text unique,
  avatar_url text,
  user_points bigint default 100,

  primary key (id),
  unique(username),
  constraint username_length check (char_length(username) >= 3)
);

alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Set up Realtime!
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime
  add table profiles;

-- Set up Storage!
insert into storage.buckets (id, name)
  values ('avatars', 'avatars');

create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');

create policy "Anyone can update an avatar." on storage.objects
  for update with check (bucket_id = 'avatars');
```

### 2. handle new users
```bash
-- inserts a row into public.users
create or replace function public.handle_new_user() 
returns trigger 
language plpgsql 
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data->>'username');
  return new;
end;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created on auth.users;
-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### 3. questions table
```bash
create table questions (
  question_id bigint generated by default as identity primary key,
  category text check (char_length(category) > 3),
  question text check (char_length(category) > 3),
  description text,
  image text,
  created_at timestamp default timezone('utc'::text, now()) not null,
  expire_at timestamp,
  choice bigint,
  expired boolean default false
);
```

### 4. choices table
```bash
create table choices (
  choice_id bigint generated by default as identity primary key,
  votes bigint default 1,
  choice text,
  question_id bigint references questions (question_id) on delete cascade
);
```


### 5. votes table
```bash
create table votes (
  vote_id bigint generated by default as identity primary key,
  voter_id uuid references profiles (id) on delete cascade,
  choice_id bigint references choices (choice_id) on delete cascade,
  created_at timestamp default timezone('utc'::text, now()) not null,
  question_id bigint references questions (question_id) on delete cascade,
  points_used bigint
);
```

### 6. deduct points function  
```bash
create or replace function deduct_points(question_points_input bigint)
returns bigint 
language plpgsql
as $$
	declare
                current_points bigint;
	begin
        --lookup user current points
        select user_points
        into current_points
        from public.profiles
        where id = auth.uid();
        --deduct
        current_points = current_points - question_points_input;
        --update
        update public.profiles
        set user_points = current_points
        where id = auth.uid();
        --return new user point
        return current_points;
	end;
$$;
```

### 7. duration function -- To calculate time to expiry 
```bash
create or replace function duration(id_input bigint)
returns interval
language plpgsql
as $$
	declare
    difference interval;
	begin
    --find difference in time
    select AGE(expire_at,timezone('utc'::text, now())) 
    into difference
    from public.questions
    where question_id = id_input;
    --return 
    return difference;
	end;
$$;
```

### 8. get total votes function -- To calculate total vote 
```bash
create or replace function get_total_votes(id_input bigint)
returns bigint
language plpgsql
as $$
    declare
    total bigint;
	begin
    --lookup 
    select sum(votes)
    into total
    from public.choices
    where question_id = id_input;
    return total;
	end;
$$;
```

### 9. update vote -- To increase vote in choice by 1 when user vote and record vote
```bash
create or replace function update_vote(choice_id_input bigint, question_id_input bigint)
returns void
language plpgsql
as $$
	begin
    --update vote base on choice 
    update public.choices
    set votes = votes + 1
    where choice_id = choice_id_input;

    -- insert voter_id, choice_id, question_id
    insert into public.votes(voter_id,choice_id,question_id)
    values(auth.uid(), choice_id_input, question_id_input);
	end;
$$;
```

### 10. question done - check if user done the question
```bash
create or replace function question_done(question_id_input bigint)
returns bool
language plpgsql
as $$
	begin
    --check row exists
    return exists (select from public.votes v 
    where v.voter_id = auth.uid() and v.question_id = question_id_input);
	end;
$$;
```














