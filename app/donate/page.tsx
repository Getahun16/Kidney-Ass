export default function DonatePage() {
  return (
    <section className="max-w-4xl mx-auto p-6 sm:p-10 bg-white rounded-3xl shadow-xl mt-12 border border-gray-100">
      <h1 className="text-3xl sm:text-4xl font-bold text-lime-800 mb-6 text-center bg-gradient-to-r from-lime-700 to-lime-600 bg-clip-text text-transparent">
        Support Our Work
      </h1>
      <p className="text-gray-700 text-lg mb-10 text-center max-w-2xl mx-auto leading-relaxed">
        Your donation helps us advance kidney health awareness, prevention, and
        care across Ethiopia. Every contribution matters.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-lime-50 p-6 rounded-xl border border-lime-200 shadow-sm">
          <h2 className="text-xl font-semibold text-lime-800 mb-4">Telebirr</h2>
          <p className="text-gray-700 mb-2">
            📱 Telebirr Account:
            <span className="font-semibold text-lime-700 ml-1">
              0922-345678
            </span>
          </p>
        </div>

        <div className="bg-lime-50 p-6 rounded-xl border border-lime-200 shadow-sm">
          <h2 className="text-xl font-semibold text-lime-800 mb-4">
            Commercial Bank of Ethiopia (CBE)
          </h2>
          <p className="text-gray-700 mb-2">
            🏦 Account Name: Ethiopian Kidney Association
          </p>
          <p className="text-gray-700">
            💳 Account Number:{" "}
            <span className="font-semibold text-lime-700">1000123456789</span>
          </p>
        </div>

        <div className="bg-lime-50 p-6 rounded-xl border border-lime-200 shadow-sm">
          <h2 className="text-xl font-semibold text-lime-800 mb-4">
            Bank of Abyssinia (BOA)
          </h2>
          <p className="text-gray-700 mb-2">
            🏦 Account Name: Ethiopian Kidney Association
          </p>
          <p className="text-gray-700">
            💳 Account Number:{" "}
            <span className="font-semibold text-lime-700">0112233445566</span>
          </p>
        </div>

        <div className="bg-lime-50 p-6 rounded-xl border border-lime-200 shadow-sm">
          <h2 className="text-xl font-semibold text-lime-800 mb-4">
            Other Banks
          </h2>
          <p className="text-gray-700 mb-2">
            For additional bank details or international transfers, please
            contact us:
          </p>
          <p className="text-gray-700">
            📞 Phone:{" "}
            <span className="font-semibold text-lime-700">+251 911 123456</span>
            <br />
            📧 Email:{" "}
            <span className="font-semibold text-lime-700">info@eka.org.et</span>
          </p>
        </div>
      </div>
    </section>
  );
}
