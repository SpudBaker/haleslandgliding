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
 ** Class to represent a Flight
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
