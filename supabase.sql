create table public.valuations (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  visitor_id text not null,
  ip_hash text,
  card_id text not null,
  points_balance integer not null,
  input text not null,
  output text not null,
  best_route text,
  best_value_inr numeric,
  refused boolean not null default false,
  input_tokens integer,
  output_tokens integer
);
create index valuations_visitor_idx on public.valuations (visitor_id, created_at);
create index valuations_ip_idx on public.valuations (ip_hash, created_at);
alter table public.valuations enable row level security;  -- no policies: only the server key can read or write

create or replace function public.pushpak_stats()
returns table (balances_valued bigint, total_value_inr numeric, avg_input_tokens numeric, avg_output_tokens numeric)
language sql stable security definer set search_path = public as $$
  select count(*) filter (where not refused),
         coalesce(sum(best_value_inr) filter (where not refused), 0),
         round(avg(input_tokens), 1),
         round(avg(output_tokens), 1)
  from public.valuations;
$$;
revoke all on function public.pushpak_stats() from public, anon, authenticated;
grant execute on function public.pushpak_stats() to service_role;
