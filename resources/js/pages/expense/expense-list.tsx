import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Expense, Paginate } from '@/types';
import { Head, router } from '@inertiajs/react';
import { MoreHorizontal, Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Expenses',
        href: '/expenses',
    },
];

export default function ExpenseList({ expenses }: { expenses: Paginate<Expense> }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Expense List" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Expense List</h1>
                    <Button onClick={() => router.visit('/expenses/new')}>
                        <Plus />
                        New
                    </Button>
                </div>
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
                        {expenses.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        ) : (
                            expenses.data.map((expense) => (
                                <TableRow key={expense.id}>
                                    <TableCell>{expense.category.name}</TableCell>
                                    <TableCell>{expense.description}</TableCell>
                                    <TableCell>{expense.amount}</TableCell>
                                    <TableCell>{expense.expense_at}</TableCell>
                                    <TableCell>{expense.created_at}</TableCell>
                                    <TableCell>{expense.updated_at}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Action</DropdownMenuLabel>
                                                <DropdownMenuItem>View expense</DropdownMenuItem>
                                                <DropdownMenuItem>Update expense</DropdownMenuItem>
                                                <DropdownMenuItem>Delete expense</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href={expenses.prev_page_url}
                                className={`${(!expenses.from || expenses.current_page === expenses.from) && 'pointer-events-none opacity-50'}`}
                            />
                        </PaginationItem>
                        {expenses.links
                            .filter((link) => !link.label.includes('Previous') && !link.label.includes('Next'))
                            .map((link) => (
                                <PaginationItem>
                                    <PaginationLink isActive={link.active} href={link.url}>
                                        {link.label}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                        <PaginationItem>
                            <PaginationNext
                                href={expenses.next_page_url}
                                className={`${expenses.current_page === expenses.last_page && 'pointer-events-none opacity-50'}`}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </AppLayout>
    );
}
