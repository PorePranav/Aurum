import { useState, type ChangeEvent } from 'react';
import DatePicker from 'react-datepicker';
import '../../styles/datepicker.css';

import { useCategories } from './useCategories';
import { useCreateExpense } from './useCreateExpense';
import { type CreateExpensePayload, paymentMethods } from '../../types/types';

type CreateExpenseFormProps = {
  onCloseModal?: () => void;
};

const inputClass = `
  w-full rounded-2xl border border-border bg-elevated
  px-4 py-3 text-primary outline-none transition-all
  placeholder:text-muted focus:border-accent disabled:opacity-60
`;

const labelClass = 'text-sm font-medium text-muted';

const CreateExpenseForm = ({ onCloseModal }: CreateExpenseFormProps) => {
  const { categories = [], isPending } = useCategories();
  const { createExpense, isCreating } = useCreateExpense();

  const [formData, setFormData] = useState<CreateExpensePayload>({
    item: '',
    amount: 0,
    paymentMethod: 'UPI',
    categoryId: '',
    date: '',
  });

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === 'amount' ? parseFloat(value) || 0 : value,
    }));
  }

  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    createExpense(formData, {
      onSuccess: onCloseModal,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-semibold tracking-wide text-primary">
          Add Expense
        </h2>
      </div>

      {/* Fields */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="item" className={labelClass}>
            Expense Name
          </label>
          <input
            id="item"
            type="text"
            required
            value={formData.item}
            onChange={handleChange}
            placeholder="Dinner at cafe"
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="amount" className={labelClass}>
            Amount
          </label>
          <input
            id="amount"
            type="number"
            required
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="categoryId" className={labelClass}>
            Category
          </label>
          <select
            id="categoryId"
            required
            disabled={isPending}
            value={formData.categoryId}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">
              {isPending ? 'Loading categories...' : 'Select category'}
            </option>
            {categories.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="paymentMethod" className={labelClass}>
            Payment Method
          </label>
          <select
            id="paymentMethod"
            required
            value={formData.paymentMethod}
            onChange={handleChange}
            className={inputClass}
          >
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="date" className={labelClass}>
            Date
          </label>
          <DatePicker
            id="date"
            selected={formData.date ? new Date(formData.date) : null}
            onChange={(date: Date | null) =>
              setFormData((prev) => ({
                ...prev,
                date: date ? date.toISOString().split('T')[0] : '',
              }))
            }
            dateFormat="dd/MM/yyyy"
            placeholderText="DD/MM/YYYY"
            required
            className={inputClass}
            wrapperClassName="w-full"
            calendarClassName="aurum-datepicker"
            formatWeekDay={(day) => day.substring(0, 2)}
            popperPlacement="bottom-start"
            popperProps={{ strategy: 'fixed' }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCloseModal}
          className="
            rounded-2xl border border-border bg-elevated px-5 py-3
            font-medium text-muted transition-all
            hover:border-accent/40 hover:text-primary
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isCreating}
          className="
            rounded-2xl bg-accent px-6 py-3 text-base
            font-semibold transition-all hover:opacity-90 disabled:opacity-70
          "
        >
          {isCreating ? 'Creating...' : 'Add Expense'}
        </button>
      </div>
    </form>
  );
};

export default CreateExpenseForm;
