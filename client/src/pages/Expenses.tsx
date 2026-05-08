import PageLayout from '../styles/PageLayout';

import SpinnerMini from '../ui/SpinnerMini';

import { useUser } from '../features/authentication/useUser';
import { useExpenses } from '../features/expenses/useExpenses';
import CreateExpense from '../features/expenses/CreateExpense';

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

const Expenses = () => {
  const { user } = useUser();

  const { expenses = [], isPending } = useExpenses();

  return (
    <PageLayout>
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1
              className="
                text-4xl
                font-semibold
                tracking-wide
                text-primary
              "
            >
              Expenses
            </h1>

            <p className="mt-2 text-muted">Welcome back, {user?.name}</p>
          </div>
          <CreateExpense />
        </div>

        {isPending ? (
          <SpinnerMini />
        ) : (
          <div className="flex flex-col gap-4">
            {expenses.length === 0 ? (
              <div
                className="
                  rounded-3xl
                  border
                  border-border
                  bg-surface
                  p-10
                  text-center
                "
              >
                <p className="text-lg text-muted">No expenses added yet</p>
              </div>
            ) : (
              expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-3xl
                    border
                    border-border
                    bg-surface
                    px-6
                    py-5
                    transition-all
                    hover:border-accent/40
                  "
                >
                  <div>
                    <h3
                      className="
                        text-lg
                        font-medium
                        text-primary
                      "
                    >
                      {expense.item}
                    </h3>

                    <div
                      className="
                        mt-2
                        flex
                        items-center
                        gap-3
                        text-sm
                        text-muted
                      "
                    >
                      <span>{expense.category.name}</span>
                      <span>•</span>
                      <span>{expense.paymentMethod}</span>
                      <span>•</span>
                      <span>{formatDate(expense.date)}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p
                      className="
                        text-2xl
                        font-semibold
                        text-accent
                      "
                    >
                      ₹{Number(expense.amount).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Expenses;
