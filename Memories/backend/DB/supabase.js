import {createClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://vboomslsnhngnpwobatg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZib29tc2xzbmhuZ25wd29iYXRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3NzUxMTcsImV4cCI6MjA1NjM1MTExN30.CAdAYfrwU_w_7cI25BjfrxaaJnBgG8zkuNdG7PytXM0';
const supabase = createClient(supabaseUrl,supabaseKey);

export default supabase;