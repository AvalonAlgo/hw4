import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const body_user_id = body.usr.user_id;

    const client = await serverSupabaseClient(event);
    const { data } = await client.from('caesar_cipher').select('*');

    const filteredEncryptions = data?.filter(item => item.user_id === body_user_id);

    return {
        encryptions: filteredEncryptions
    }
})