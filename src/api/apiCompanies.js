import supabaseClient from "@/utils/supabase";

export async function getCompanies(token){
    const supabase = await supabaseClient(token)

    const {data,error} =  await supabase.from("companies").select("*")

    if(error){
        console.log("fetching companies error",error)
        return null
    }

    return data
}