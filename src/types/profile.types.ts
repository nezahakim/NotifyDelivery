
export interface Profile {
    full_name: string;
    email: string;
    phone: string;
    avatar_url?: string;
    member_since?: string;
    total_orders?: number;
    total_spent?: number;
    loyalty_points?: number;
    tier?: string;
}

export interface Address {
    id: string;
    type: 'home' | 'work' | 'other';
    label: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    is_default: boolean;
}