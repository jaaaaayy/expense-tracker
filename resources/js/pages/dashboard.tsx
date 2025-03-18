import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Expense, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({
    expenses,
    totalCategories,
    totalExpenses,
}: {
    expenses: Expense[];
    totalCategories: number;
    totalExpenses: number;
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Card className="flex flex-col justify-between">
                        <CardHeader>
                            <CardTitle className="text-4xl">Categories</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-8xl">{totalCategories}</CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="flex flex-col justify-between">
                        <CardHeader>
                            <CardTitle className="text-4xl">Expenses</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-8xl">{totalExpenses}</CardDescription>
                        </CardContent>
                    </Card>
                </div>

                <h1 className="text-xl font-medium">Recent Expenses</h1>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Table>
                        <TableCaption>A list of your recent expenses.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Category</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Expense At</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Updated At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {expenses.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                expenses.map((expense) => (
                                    <TableRow key={expense.id}>
                                        <TableCell>{expense.category.name}</TableCell>
                                        <TableCell>{expense.description}</TableCell>
                                        <TableCell>{expense.amount}</TableCell>
                                        <TableCell>{expense.expense_at}</TableCell>
                                        <TableCell>{expense.created_at}</TableCell>
                                        <TableCell>{expense.updated_at}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
