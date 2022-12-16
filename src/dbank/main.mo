import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
  stable var currentValue : Float = 300;
  // currentValue := 100;

  let id = 515665155151516;

  // Debug.print(debug_show(id));

  stable var startTime=Time.now();

  public func topUp(amount: Float) {
    currentValue += amount;
    Debug.print(debug_show (currentValue));
  };

  public func withdraw(amount: Float){
    if(currentValue >= amount){
    currentValue-=amount;
    Debug.print(debug_show(currentValue));
    }
    else{
      Debug.print("You are withdrawing more than the current balance.");
    }
  };

  public query func checkBalance(): async Float{
    return currentValue;
  };

  public func compound(){
    let currentTime=Time.now();
    let timeElapsedNS=currentTime-startTime;
    let timeElapsedS=timeElapsedNS/1000000000;
    currentValue:=currentValue*(1.01**Float.fromInt(timeElapsedS));
    startTime:=currentTime;
  }

};
