const PaystackIntergration = () => {

    return(
        <div className="items-center mb-6 p-3">
            <div>
                <h3>
                    Make Payment
                </h3>
            </div>
            <form id="paymentForm">
  <div className="form-group">
    <label htmlFor="email">Email Address</label>
    <input type="email" id="email-address" required />
  </div>
  <div className="form-group">
    <label htmlFor="amount">Amount</label>
    <input type="tel" id="amount" required />
  </div>
  <div className="form-group">
    <label htmlFor="first-name">First Name</label>
    <input type="text" id="first-name" />
  </div>
  <div className="form-group">
    <label htmlFor="last-name">Last Name</label>
    <input type="text" id="last-name" />
  </div>
  <div className="form-submit">
    <button type="submit" onClick={payWithPaystack()}> Pay </button>
  </div>
</form>

{/* <script src="https://js.paystack.co/v1/inline.js"></script> */}
        </div>
    )
}

export default PaystackIntergration