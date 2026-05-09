import CreateExpenseForm from './CreateExpenseForm';
import Modal from '../../ui/Modal';


export default function CreateExpense() {
  return (
    <Modal>
      <Modal.Open opens="create-expense">
        <button
          type="button"
          className="
            rounded-2xl
            bg-accent
            px-5
            py-3
            font-semibold
            tracking-wide
            text-base
            transition-all
            duration-200
            hover:translate-y-px
            hover:opacity-90
            focus:outline-none
            focus:ring-2
            focus:ring-accent/30
          "
        >
          Add Expense
        </button>
      </Modal.Open>

      <Modal.Window name="create-expense">
        <CreateExpenseForm />
      </Modal.Window>
    </Modal>
  );
}
