import { useUser } from '../features/authentication/useUser';
import CreateExpense from '../features/expenses/CreateExpense';
import { useExpenses } from '../features/expenses/useExpenses';
import PageLayout from '../styles/PageLayout';
import SpinnerMini from '../ui/SpinnerMini';


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
        {/* Header */}
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

        {/* Content */}
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
                  <div className="flex items-start justify-between gap-4">
                    {/* Left */}
                    <div className="min-w-0 flex-1">
                      {/* Item + Paid To */}
                      <div className="flex items-baseline gap-2">
                        <h3
                          className="
                            truncate
                            text-xl
                            font-semibold
                            text-primary
                          "
                        >
                          {expense.item}
                        </h3>

                        {expense.paidTo && (
                          <>
                            <span className="text-muted">·</span>
                            <p className="shrink-0 text-sm text-muted">
                              {expense.paidTo}
                            </p>
                          </>
                        )}
                      </div>

                      {/* Meta */}
                      <div
                        className="
                          mt-4
                          flex
                          flex-wrap
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

                    {/* Right */}
                    <div className="shrink-0 text-right">
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
