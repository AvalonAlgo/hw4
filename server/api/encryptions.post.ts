import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event);
    const user = await serverSupabaseUser(event);

    const body = await readBody(event);

    const { error } = await client.from('caesar_cipher').insert({
        user_id: user.id,
        encrypted_text: body.encrypted_text,
        shift_amount: body.shift_amount,
    })

    return {
        error
    }
})