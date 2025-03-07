import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Expense List',
        href: '/expenses',
    },
    {
        title: 'New Expense',
        href: '/expenses/new',
    },
];

export default function NewExpense() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New Expense" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">New Expense Form</div>
        </AppLayout>
    );
}
