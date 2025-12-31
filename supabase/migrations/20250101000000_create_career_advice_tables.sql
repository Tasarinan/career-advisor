-- Create career_advice_batches table
CREATE TABLE IF NOT EXISTS career_advice_batches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_position text NOT NULL,
  industry text NOT NULL,
  years_of_experience integer NOT NULL,
  career_goals text NOT NULL,
  credits_used integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create career_advice_items table
CREATE TABLE IF NOT EXISTS career_advice_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id uuid NOT NULL REFERENCES career_advice_batches(id) ON DELETE CASCADE,
  position text NOT NULL,
  industry text NOT NULL,
  salary_min integer,
  salary_max integer,
  required_skills text[] DEFAULT ARRAY[]::text[],
  development_path text,
  growth_opportunities text[] DEFAULT ARRAY[]::text[],
  challenge_level text,
  market_demand text,
  next_steps text[] DEFAULT ARRAY[]::text[],
  created_at timestamp with time zone DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_career_advice_batches_user_id ON career_advice_batches(user_id);
CREATE INDEX IF NOT EXISTS idx_career_advice_items_batch_id ON career_advice_items(batch_id);
CREATE INDEX IF NOT EXISTS idx_career_advice_batches_created_at ON career_advice_batches(created_at DESC);

-- Enable RLS
ALTER TABLE career_advice_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_advice_items ENABLE ROW LEVEL SECURITY;

-- RLS policies for career_advice_batches
CREATE POLICY "Users can view their own career advice batches"
  ON career_advice_batches
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own career advice batches"
  ON career_advice_batches
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS policies for career_advice_items
CREATE POLICY "Users can view career advice items from their batches"
  ON career_advice_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM career_advice_batches
      WHERE id = batch_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Service can insert career advice items"
  ON career_advice_items
  FOR INSERT
  WITH CHECK (true);
