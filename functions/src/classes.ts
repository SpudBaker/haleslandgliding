/**
 ** Class to represent a Flight
 */
export class FlightBackEnd {
  readonly Ref: string;
  readonly P1Ref: string;
  readonly P2Ref: string;
  readonly ChargeToText: string;
  readonly FlightDate: string;
  readonly Glider: string;
  readonly TakeOff: string;
  readonly Duration: string;
  readonly Type: string;
  readonly FlightType: string;
  readonly P1: string;
  readonly P2: string;
  readonly Notes: string;
  readonly ChargeToRef: string;
  /**
  * Class constructor
  * @param {string} Ref
  * @param {string} P1Ref
  * @param {string} P2Ref
  * @param {string} ChargeToText
  * @param {string} FlightDate
  * @param {string} Glider
  * @param {string} TakeOff
  * @param {string} Duration
  * @param {string} Type
  * @param {string} FlightType
  * @param {string} P1
  * @param {string} P2
  * @param {string} Notes
  * @param {string} ChargeToRef
  */
  constructor(Ref: string, P1Ref: string, P2Ref: string, ChargeToText: string,
    FlightDate: string, Glider: string, TakeOff: string, Duration: string,
    Type: string, FlightType: string, P1: string, P2: string,
    Notes: string, ChargeToRef: string) {
    this.Ref = Ref;
    this.P1Ref = P1Ref;
    this.P2Ref = P2Ref;
    this.ChargeToText = ChargeToText;
    this.FlightDate = FlightDate;
    this.Glider = Glider;
    this.TakeOff = TakeOff;
    this.Duration = Duration;
    this.Type = Type;
    this.FlightType = FlightType;
    this.P1 = P1;
    this.P2 = P2;
    this.Notes = Notes;
    this.ChargeToRef = ChargeToRef;
  }
}

/**
 * Class to represent a Gift Aid Summary.
 */
export class GiftAidDetail {
  readonly CarMiles: string;
  readonly Passenger: string;
  readonly Motorcycle: string;
  readonly Cycle: string;
  readonly BusTrain: string;
  readonly Date: string;
  readonly DutyComment: string;
  readonly MemberRef: string;
  readonly Attended: string;
  readonly MemberNumber: string;
  readonly MemberName: string;
  readonly PostCode: string;
  readonly Mileage: string;
  readonly Flights: string;
  readonly P1Flights: string;
  readonly PUIP2Flights: string;
  readonly P1Paid: string;
  readonly P2Paid: string;
  readonly SharedCost: string;
  readonly OtherPaid: string;
  /**
  * Class constructor
  * @param {string} CarMiles
  * @param {string} Passenger
  * @param {string} Motorcycle
  * @param {string} Cycle
  * @param {string} BusTrain
  * @param {string} Date
  * @param {string} DutyComment
  * @param {string} MemberRef
  * @param {string} Attended
  * @param {string} MemberNumber
  * @param {string} MemberName
  * @param {string} PostCode
  * @param {string} Mileage
  * @param {string} Flights
  * @param {string} P1Flights
  * @param {string} PUIP2Flights
  * @param {string} P1Paid
  * @param {string} P2Paid
  * @param {string} SharedCost
  * @param {string} OtherPaid
  */
  constructor(CarMiles: string, Passenger: string, Motorcycle: string,
    Cycle: string, BusTrain: string, Date: string, DutyComment: string,
    MemberRef: string, Attended: string, MemberNumber: string,
    MemberName: string, PostCode: string, Mileage: string, Flights: string,
    P1Flights: string, PUIP2Flights: string, P1Paid: string, P2Paid: string,
    SharedCost: string, OtherPaid: string) {
    this.CarMiles = CarMiles;
    this.Passenger = Passenger;
    this.Motorcycle = Motorcycle;
    this.Cycle = Cycle;
    this.BusTrain = BusTrain;
    this.Date = Date;
    this.DutyComment = DutyComment;
    this.MemberRef = MemberRef;
    this.Attended = Attended;
    this.MemberNumber = MemberNumber;
    this.MemberName = MemberName;
    this.PostCode = PostCode;
    this.Mileage = Mileage;
    this.Flights = Flights;
    this.P1Flights = P1Flights;
    this.PUIP2Flights = PUIP2Flights;
    this.P1Paid = P1Paid;
    this.P2Paid = P2Paid;
    this.SharedCost = SharedCost;
    this.OtherPaid = OtherPaid;
  }
}

/**
 * Class to represent a Gift Aid Summary.
 */
export class GiftAidSummary {
  readonly MemberRef: string;
  readonly MemberNumber: string;
  readonly MemberName: string;
  readonly FromDate: string;
  readonly ToDate: string;
  readonly ClaimDays: string;
  readonly PostCode: string;
  readonly RoundTripMileage: string;
  readonly VehicleType: string;
  readonly PotentialClaimValue: string;
/**
  * Class constructor
  * @param {string} MemberRef
  * @param {string} MemberNumber
  * @param {string} MemberName
  * @param {string} FromDate
  * @param {string} ToDate
  * @param {string} ClaimDays
  * @param {string} PostCode
  * @param {string} RoundTripMileage
  * @param {string} VehicleType
  * @param {string} PotentialClaimValue
  */
  constructor(MemberRef: string, MemberNumber: string, MemberName: string,
    FromDate: string, ToDate: string, ClaimDays: string, PostCode: string,
    RoundTripMileage: string, VehicleType: string,
    PotentialClaimValue: string) {
    this.MemberRef = MemberRef;
    this.MemberNumber = MemberNumber;
    this.MemberName = MemberName;
    this.FromDate = FromDate;
    this.ToDate = ToDate;
    this.ClaimDays= ClaimDays;
    this.PostCode = PostCode;
    this.RoundTripMileage = RoundTripMileage;
    this.VehicleType = VehicleType;
    this.PotentialClaimValue = PotentialClaimValue;
  }
}

/**
 * Class to represent a MGC member
 */
export class MemberBackEnd {
  readonly Ref: string;
  readonly MemberType: string;
  readonly MembershipNo: string;
  readonly Name: string;
  readonly Postcode: string;
  readonly TelMobile: string;
  readonly TelHome: string;
  readonly EMail: string;
  readonly EmergencyContact: string;
  readonly DateJoined: string;
  readonly MembershipExpires: string;
  readonly LapsedMember: boolean;
  readonly MedicalValidTo: string;
  readonly AFRDue: string;
  readonly GiftAidMiles: number;
  readonly ChargeToName: string;
  readonly LatestBalance: number;
  readonly DateLastFlight: string;
  /**
  * Class constructor
  * @param {string} Ref
  * @param {string} MemberType
  * @param {string} MembershipNo
  * @param {string} Name
  * @param {string} Postcode
  * @param {string} TelMobile
  * @param {string} TelHome
  * @param {string} EMail
  * @param {string} EmergencyContact
  * @param {string} DateJoined
  * @param {string} MembershipExpires
  * @param {boolean} LapsedMember
  * @param {string} MedicalValidTo
  * @param {string} AFRDue
  * @param {string} GiftAidMiles
  * @param {string} ChargeToName
  * @param {number} LatestBalance
  * @param {string} DateLastFlight
  */
  constructor(Ref: string, MemberType: string, MembershipNo: string,
    Name: string, Postcode: string, TelMobile: string,
    TelHome: string, EMail: string, EmergencyContact: string,
    DateJoined: string, MembershipExpires: string, LapsedMember: boolean,
    MedicalValidTo: string, AFRDue: string, GiftAidMiles: number,
    ChargeToName: string, LatestBalance: number, DateLastFlight: string) {
    this.Ref = Ref,
    this.MemberType = MemberType;
    this.MembershipNo = MembershipNo;
    this.Name = Name;
    this.Postcode = Postcode;
    this.TelMobile = TelMobile;
    this.TelHome = TelHome;
    this.EMail = EMail;
    this.EmergencyContact = EmergencyContact;
    this.DateJoined = DateJoined;
    this.MembershipExpires = MembershipExpires;
    this.LapsedMember = LapsedMember;
    this.MedicalValidTo= MedicalValidTo;
    this.AFRDue = AFRDue;
    this.GiftAidMiles = GiftAidMiles;
    this.ChargeToName = ChargeToName;
    this.LatestBalance = LatestBalance;
    this.DateLastFlight = DateLastFlight;
  }
}

/**
 ** Class to represent a transaction
 */
export class TransactionBackEnd {
  readonly Reference: string;
  readonly TransactionType: string;
  readonly TransactionDate: string;
  readonly MemberRef: string;
  readonly Member: string;
  readonly Charges: string;
  readonly Payment: string;
  readonly Notes: string;
  /**
  * Class constructor
  * @param {string} Reference
  * @param {string} TransactionType
  * @param {string} TransactionDate
  * @param {string} MemberRef
  * @param {string} Member
  * @param {string} Charges
  * @param {string} Payment
  * @param {string} Notes
  */
  constructor(Reference: string, TransactionType: string,
    TransactionDate: string, MemberRef: string, Member: string, Charges: string,
    Payment: string, Notes: string) {
    this.Reference = Reference;
    this.TransactionType = TransactionType;
    this.TransactionDate = TransactionDate;
    this.MemberRef = MemberRef;
    this.Member = Member;
    this.Charges = Charges;
    this.Payment = Payment;
    this.TransactionDate = TransactionDate;
    this.Notes = Notes;
  }
}
