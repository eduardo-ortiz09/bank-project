function ATMForm({ onChange, isDeposit, isValid}){
  const choice = ["Deposit", "Cash Back"];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label>
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="txtForm" type="number" width="200" onChange={onChange} className="form-control"></input>
      {isValid
        ? <input type="submit" width="200" value={choice[Number(!isDeposit)]} className="btn btn-light mt-2 enable"></input>
        : <input type="submit" width="200" value={choice[Number(!isDeposit)]} disabled className="btn btn-light mt-2 disable"></input>
      }
    </label>
  );
};

export default ATMForm;
