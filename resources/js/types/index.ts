import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Category {
    id: number;
    user_id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface Expense {
    id: number;
    user: User;
    user_id: number;
    category: Category;
    category_id: number;
    description: string;
    amount: number;
    expense_at: string;
    created_at: string;
    updated_at: string;
}

export interface Paginate<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        active: boolean;
        label: string;
        url: string | undefined;
    }[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string | undefined;
    to: number;
    total: number;
}
