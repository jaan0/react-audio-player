const Contact = () => {
    return (
      <div className="w-full max-w-md mx-auto p-4 sm:p-6 md:p-8 bg-gray-800 rounded-lg shadow-xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-5 text-white text-center">Contact Us</h1>
        <p className="text-white text-center mb-4 sm:mb-6">We'd love to hear from you!</p>
        <form className="space-y-3 sm:space-y-4">
          <div>
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full px-3 sm:px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
            />
          </div>
          <div>
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full px-3 sm:px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
            />
          </div>
          <div>
            <textarea 
              placeholder="Message" 
              rows={4}
              className="w-full px-3 sm:px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
            ></textarea>
          </div>
          <div>
            <button 
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded transition duration-300 text-sm sm:text-base"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default Contact;
  
  