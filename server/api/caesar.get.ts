import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event);
    const user = await serverSupabaseUser(event);

    const { data } = await client.from('caesar_cipher')
        .select('encrypted_text,shift_amount,created_at')
        .eq('user_id', user.id);

    return {
        encryptions: data
    }
})