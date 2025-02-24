export default function WarningPopup({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-80">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">NOTE : </h2>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Please note that responses may occasionally contain inaccuracies.
          Always verify critical details with trusted Islamic scholars or
          reliable sources. May Allah guide us all to the truth and bless our
          efforts during Ramadan.
        </p>
        <button
          onClick={onClose}
          className="mt-3 w-full bg-gradient-to-r from-violet-800 to-fuchsia-500 font-medium text-white py-2 rounded-md"
        >
          Okay
        </button>
      </div>
    </div>
  );
}
