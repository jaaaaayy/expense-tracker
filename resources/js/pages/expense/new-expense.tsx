import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem, Category } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

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

type NewExpenseForm = {
    user_id: number;
    category_id: number;
    description: string;
    amount: string;
    expense_at: string;
};

export default function NewExpense({ user_id, categories }: { user_id: number; categories: Category[] }) {
    const [date, setDate] = useState<Date>();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const { data, setData, post, processing, errors, reset } = useForm<Required<NewExpenseForm>>({
        user_id: user_id,
        category_id: 0,
        description: '',
        amount: '0.00',
        expense_at: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('expenses.store'), {
            onFinish: () => reset('user_id', 'category_id'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New Expense" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-xl font-medium">New Expense</h1>
                <form className="flex max-w-xl flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label>Category</Label>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" role="combobox" aria-expanded={open} className="cursor-pointer justify-between">
                                        {value ? categories.find((category) => category.name === value)?.name : 'Select category...'}
                                        <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="p-0">
                                    <Command>
                                        <CommandInput placeholder="Search framework..." className="h-9" />
                                        <CommandList>
                                            <CommandEmpty>No category found.</CommandEmpty>
                                            <CommandGroup>
                                                {categories.map((category) => (
                                                    <CommandItem
                                                        key={category.id}
                                                        value={category.name}
                                                        onSelect={(currentValue) => {
                                                            setData('category_id', category.id);
                                                            setValue(currentValue === value ? '' : currentValue);
                                                            setOpen(false);
                                                        }}
                                                        className="cursor-pointer"
                                                    >
                                                        {category.name}
                                                        <Check className={cn('ml-auto', value === category.name ? 'opacity-100' : 'opacity-0')} />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <InputError message={errors.category_id} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Description"
                                className="col-span-4"
                            />
                            <InputError message={errors.description} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                id="amount"
                                type="number"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="amount"
                                value={data.amount}
                                onChange={(e) => setData('amount', e.target.value)}
                                placeholder="Amount"
                                className="col-span-4"
                            />
                            <InputError message={errors.amount} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="amount">Expense At</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={'outline'}
                                        className={cn('justify-start text-left font-normal', !date && 'text-muted-foreground')}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={(selectedDate) => {
                                            setDate(selectedDate || undefined);
                                            setData('expense_at', selectedDate ? selectedDate.toLocaleDateString('en-CA') : '');
                                        }}
                                        autoFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <InputError message={errors.expense_at} />
                        </div>
                    </div>
                    <Button type="submit" className="w-fit" disabled={processing}>
                        {processing ? 'Saving...' : 'Save'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
