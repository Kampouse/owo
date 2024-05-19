import { supabase } from "@/config/SupabaseClient";
import { Listing, UserProfile } from "./Listing";

type SearchUsescase = {
    searchQuery: string;
}

export const searchListings = async ({ searchQuery }: SearchUsescase): Promise<Listing[]> => {
    const response = await fetch('/api/listings/search-offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }),
      })
    const result = await response.json()
    const listing = result.data

    if (!listing) {
        return []
    }

    return listing.map(assembleListing)
}

export const fetchListings = async (): Promise<Listing[]> => {
    const { data: listing } = await supabase
        .from('offer')
        .select(`
            id,
            created_at,
            title,
            description,
            tags,
            type,
            images,
            price,
            user_profile (
                id,
                name,
                email,
                created_at,
                username
            )
        `)
        .eq('deleted', false)
        .order('created_at', { ascending: false })

    if (!listing) {
        return []
    }

    return listing.map(assembleListing)
}

const assembleListing = (listing: any): Listing => {
    return {
        ...listing,
        userProfile: singleUserProfile(listing.user_profile)
    }
}

const singleUserProfile = (userProfile: any): UserProfile => {
    return {
        id: userProfile.id,
        name: userProfile.name,
        email: userProfile.email,
        username: userProfile.username,
        createdAt: userProfile.created_at
    }
}

type DeleteUsecase = {
    id: string;
}

export const deleteListing = async ({ id }: DeleteUsecase): Promise<void> => {
    await supabase
        .from('offer')
        .update({deleted: true})
        .eq('id', id)
}

type MarkAsSoldListing = DeleteUsecase;

export const markAsSoldListing = async ({ id }: MarkAsSoldListing): Promise<void> => {
    await supabase
        .from('offer')
        .update({sold: true})
        .eq('id', id)
}
