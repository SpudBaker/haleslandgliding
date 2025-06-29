export class Member {
    Ref: string;
    MemberType_ref!: string;
    Membership_No!: string;
    Name!: string;
    Postcode!: string;
    Tel_Mobile!: string;
    EMail!: string;
    Emergency_Contact!: string;
    Date_Joined!: string;
    Membership_Expires!: string;
    Date_Lapsed!: string;
    Lapsed_Member!: string;
    Medical_ValidTo!: string;
    AFR_Due!: string;
    RoundTrip_Mileage!: string;
    ChargeTo_ref!: string;
    BalLastMonthEnd!: string;
    DateLastFlight!: string;
    constructor(Ref: string, MemberType_ref: string, Membership_No: string, Name: string, Postcode: string, Tel_Mobile: string,
        EMail: string, Emergency_Contact: string, Date_Joined: string, Membership_Expires: string, Date_Lapsed: string,
        Lapsed_Member: string, Medical_ValidTo: string, AFR_Due: string, RoundTrip_Mileage: string, ChargeTo_ref: string,
        BalLastMonthEnd: string, DateLastFlight: string){
            this.Ref = Ref,
            this.MemberType_ref = MemberType_ref;
            this.Membership_No = Membership_No;
            this.Name = Name;
            this.Postcode = Postcode;
            this.Tel_Mobile = Tel_Mobile;
            this.EMail = EMail;
            this.Emergency_Contact = Emergency_Contact;
            this.Date_Joined = Date_Joined;
            this.Membership_Expires = Membership_Expires;
            this.Date_Lapsed = Date_Lapsed;
            this.Lapsed_Member = Lapsed_Member;
            this.Medical_ValidTo= Medical_ValidTo;
            this.AFR_Due = AFR_Due;
            this.RoundTrip_Mileage = RoundTrip_Mileage;
            this.ChargeTo_ref = ChargeTo_ref;
            this.BalLastMonthEnd = BalLastMonthEnd;
            this.DateLastFlight = DateLastFlight;
    }
}