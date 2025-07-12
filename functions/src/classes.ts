/**
 ** Class to represent a Flight
 */
export class FlightBackEnd {
  readonly Ref: string;
  readonly P1Ref: string;
  readonly P2Ref: string;
  readonly ChargeToRef: string;
  readonly FlightDate: string;
  readonly Glider: string;
  readonly TakeOff: string;
  readonly Duration: string;
  readonly Type: string;
  readonly FlightType: string;
  readonly P1: string;
  readonly P2: string;
  readonly Notes: string;
  /**
  * Class constructor
  * @param {string} Ref
  * @param {string} P1Ref
  * @param {string} P2Ref
  * @param {string} ChargeToRef
  * @param {string} FlightDate
  * @param {string} Glider
  * @param {string} TakeOff
  * @param {string} Duration
  * @param {string} Type
  * @param {string} FlightType
  * @param {string} P1
  * @param {string} P2
  * @param {string} Notes
  */
  constructor(Ref: string, P1Ref: string, P2Ref: string, ChargeToRef: string,
    FlightDate: string, Glider: string, TakeOff: string, Duration: string,
    Type: string, FlightType: string, P1: string, P2: string,
    Notes: string) {
    this.Ref = Ref;
    this.P1Ref = P1Ref;
    this.P2Ref = P2Ref;
    this.ChargeToRef = ChargeToRef;
    this.FlightDate = FlightDate;
    this.Glider = Glider;
    this.TakeOff = TakeOff;
    this.Duration = Duration;
    this.Type = Type;
    this.FlightType = FlightType;
    this.P1 = P1;
    this.P2 = P2;
    this.Notes = Notes;
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
