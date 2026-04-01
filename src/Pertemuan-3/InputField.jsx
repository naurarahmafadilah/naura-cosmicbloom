function InputField({ label, name, type, value, onChange, error }) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-semibold mb-1 text-gray-700">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            />


            {error && (
                <p className="text-red-500 text-sm mt-1 bg-red-100 px-2 py-1 rounded">
                    {error}
                </p>
            )}
        </div>
    );
}

export default InputField;