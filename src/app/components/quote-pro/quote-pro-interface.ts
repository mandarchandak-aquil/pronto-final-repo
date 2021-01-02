declare module namespace {

    export interface Driver {
        gender: string;
        maritalStatus: string;
        licType: string;
        strictValidation: boolean;
        educationLevel?: any;
        occupation: string;
        firstName: string;
        lastName: string;
        dob: Date;
        licSusRev?: any;
        driverNumber: number;
        excluded: boolean;
        relationship?: any;
        sr22?: any;
        anyViolations: boolean;
    }

    export interface Quote {
        nonOwner: boolean;
        agreeNonOwner: boolean;
        currentlyInsured: boolean;
        noPrior: string;
        priorCarrier?: any;
        priorLimits?: any;
        priorPolicyNumber?: any;
        priorExp?: any;
        yearsInsured: number;
        monthsInsured?: any;
        priorClaims?: any;
        lastClaimDate?: any;
        paperLessDisc: boolean;
    }

    export interface Vehicle {
        id: number;
        isLastVehicle: boolean;
        addAnotherVehicle: boolean;
        vehicleNumber: number;
        isoVinNumber: string;
        actualValue: number;
        costNew: number;
        strictValidation: boolean;
        imsControl: number;
        quickLookup: boolean;
        fullLookup: boolean;
        vinNumber?: any;
        year: string;
        make: string;
        modelDescription: string;
        trimCode: string;
        styleCode: string;
        engine: string;
        usecode: number;
        lengthOwned: number;
        dailyMiles: number;
        miles1Way: number;
        annualMiles: number;
        rideSharing: boolean;
        ownership: number;
        lienHolder: boolean;
        lhname?: any;
        lhaddress1?: any;
        lhzipcode?: any;
        lhstate?: any;
    }

    export interface Form {
        id: number;
        disableValidation: boolean;
        firstName: string;
        lastName: string;
        address: string;
        unit?: any;
        state: string;
        zipCode: string;
        phone: string;
        email: string;
        dob: Date;
        driver: Driver;
        yearsAtAddress?: any;
        monthsAtAddress?: any;
        howHeard?: any;
        quote: Quote;
        sr22: boolean;
        vehicle: Vehicle;
        addressType: string;
    }

    export interface Id {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface DisableValidation {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface TypeId {
    }

    export interface Requiredif {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface FirstName {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
        requiredif: Requiredif;
    }

    export interface TypeId2 {
    }

    export interface Requiredif2 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId2;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface LastName {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
        requiredif: Requiredif2;
    }

    export interface TypeId3 {
    }

    export interface Requiredif3 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId3;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface Address {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
        requiredif: Requiredif3;
    }

    export interface Unit {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface TypeId4 {
    }

    export interface Requiredif4 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId4;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface State {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
        requiredif: Requiredif4;
    }

    export interface ZipCode {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface TypeId5 {
    }

    export interface Requiredif5 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId5;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface Phone {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
        requiredif: Requiredif5;
    }

    export interface TypeId6 {
    }

    export interface Requiredif6 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId6;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface Email {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
        requiredif: Requiredif6;
    }

    export interface Dob {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface Option {
        selected: boolean;
        text: string;
        value: string;
    }

    export interface TypeId7 {
    }

    export interface Requiredif7 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId7;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface Gender {
        control: string;
        type: string;
        label: string;
        options: Option[];
        sort: number;
        required: boolean;
        requiredif: Requiredif7;
    }

    export interface Option2 {
        selected: boolean;
        text: string;
        value: string;
    }

    export interface TypeId8 {
    }

    export interface Requiredif8 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId8;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface MaritalStatus {
        control: string;
        type: string;
        label: string;
        options: Option2[];
        sort: number;
        required: boolean;
        requiredif: Requiredif8;
    }

    export interface Option3 {
        disabled: boolean;
        selected: boolean;
        text: string;
        value: string;
    }

    export interface TypeId9 {
    }

    export interface Requiredif9 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId9;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface LicType {
        control: string;
        label: string;
        options: Option3[];
        sort: number;
        required: boolean;
        requiredif: Requiredif9;
    }

    export interface StrictValidation {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface EducationLevel {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface Occupation {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface FirstName2 {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface LastName2 {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface Dob2 {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface TypeId10 {
    }

    export interface Requiredif10 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId10;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface LicSusRev {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
        requiredif: Requiredif10;
    }

    export interface DriverNumber {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface Excluded {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface Relationship {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface TypeId11 {
    }

    export interface Requiredif11 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId11;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface Sr22 {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
        requiredif: Requiredif11;
    }

    export interface AnyViolations {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface Driver2 {
        gender: Gender;
        maritalStatus: MaritalStatus;
        licType: LicType;
        strictValidation: StrictValidation;
        educationLevel: EducationLevel;
        occupation: Occupation;
        firstName: FirstName2;
        lastName: LastName2;
        dob: Dob2;
        licSusRev: LicSusRev;
        driverNumber: DriverNumber;
        excluded: Excluded;
        relationship: Relationship;
        sr22: Sr22;
        anyViolations: AnyViolations;
    }

    export interface YearsAtAddress {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface MonthsAtAddress {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface HowHeard {
        control: string;
        label: string;
        options: any[];
        sort: number;
        required: boolean;
    }

    export interface Option4 {
        selected: boolean;
        text: string;
        value: boolean;
    }

    export interface NonOwner {
        control: string;
        type: string;
        label: string;
        options: Option4[];
        sort: number;
        required: boolean;
    }

    export interface TypeId12 {
    }

    export interface Requiredif12 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId12;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface AgreeNonOwner {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
        requiredif: Requiredif12;
    }

    export interface Option5 {
        selected: boolean;
        text: string;
        value: boolean;
    }

    export interface CurrentlyInsured {
        control: string;
        type: string;
        label: string;
        options: Option5[];
        sort: number;
        required: boolean;
    }

    export interface TypeId13 {
    }

    export interface Requiredif13 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId13;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface NoPrior {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
        requiredif: Requiredif13;
    }

    export interface TypeId14 {
    }

    export interface Requiredif14 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId14;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface PriorCarrier {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
        requiredif: Requiredif14;
    }

    export interface Option6 {
        disabled: boolean;
        selected: boolean;
        text: string;
        value: string;
    }

    export interface TypeId15 {
    }

    export interface Requiredif15 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId15;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface PriorLimits {
        control: string;
        label: string;
        options: Option6[];
        sort: number;
        required: boolean;
        requiredif: Requiredif15;
    }

    export interface TypeId16 {
    }

    export interface Requiredif16 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId16;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface PriorPolicyNumber {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
        requiredif: Requiredif16;
    }

    export interface TypeId17 {
    }

    export interface Requiredif17 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId17;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface PriorExp {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
        requiredif: Requiredif17;
    }

    export interface TypeId18 {
    }

    export interface Requiredif18 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId18;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface YearsInsured {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
        requiredif: Requiredif18;
    }

    export interface TypeId19 {
    }

    export interface Requiredif19 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId19;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface MonthsInsured {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
        requiredif: Requiredif19;
    }

    export interface Option7 {
        selected: boolean;
        text: string;
        value: boolean;
    }

    export interface TypeId20 {
    }

    export interface Requiredif20 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId20;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface PriorClaims {
        control: string;
        type: string;
        label: string;
        options: Option7[];
        sort: number;
        required: boolean;
        requiredif: Requiredif20;
    }

    export interface TypeId21 {
    }

    export interface Requiredif21 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId21;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface LastClaimDate {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
        requiredif: Requiredif21;
    }

    export interface PaperLessDisc {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface Quote2 {
        nonOwner: NonOwner;
        agreeNonOwner: AgreeNonOwner;
        currentlyInsured: CurrentlyInsured;
        noPrior: NoPrior;
        priorCarrier: PriorCarrier;
        priorLimits: PriorLimits;
        priorPolicyNumber: PriorPolicyNumber;
        priorExp: PriorExp;
        yearsInsured: YearsInsured;
        monthsInsured: MonthsInsured;
        priorClaims: PriorClaims;
        lastClaimDate: LastClaimDate;
        paperLessDisc: PaperLessDisc;
    }

    export interface Option8 {
        selected: boolean;
        text: string;
        value: boolean;
    }

    export interface Sr222 {
        control: string;
        type: string;
        label: string;
        options: Option8[];
        sort: number;
        required: boolean;
    }

    export interface Id2 {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface IsLastVehicle {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface AddAnotherVehicle {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface VehicleNumber {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface IsoVinNumber {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface ActualValue {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface CostNew {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface StrictValidation2 {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface ImsControl {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface QuickLookup {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface FullLookup {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface TypeId22 {
    }

    export interface Requiredif22 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId22;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface VinNumber {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
        requiredif: Requiredif22;
    }

    export interface Option9 {
        disabled: boolean;
        selected: boolean;
        text: string;
    }

    export interface TypeId23 {
    }

    export interface Requiredif23 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId23;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface Year {
        control: string;
        label: string;
        options: Option9[];
        sort: number;
        required: boolean;
        requiredif: Requiredif23;
    }

    export interface Option10 {
        disabled: boolean;
        selected: boolean;
        text: string;
    }

    export interface TypeId24 {
    }

    export interface Requiredif24 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId24;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface Make {
        control: string;
        label: string;
        options: Option10[];
        sort: number;
        required: boolean;
        requiredif: Requiredif24;
    }

    export interface Option11 {
        disabled: boolean;
        selected: boolean;
        text: string;
    }

    export interface TypeId25 {
    }

    export interface Requiredif25 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId25;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface ModelDescription {
        control: string;
        label: string;
        options: Option11[];
        sort: number;
        required: boolean;
        requiredif: Requiredif25;
    }

    export interface Option12 {
        disabled: boolean;
        selected: boolean;
        text: string;
    }

    export interface TypeId26 {
    }

    export interface Requiredif26 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId26;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface TrimCode {
        control: string;
        label: string;
        options: Option12[];
        sort: number;
        required: boolean;
        requiredif: Requiredif26;
    }

    export interface Option13 {
        disabled: boolean;
        selected: boolean;
        text: string;
    }

    export interface TypeId27 {
    }

    export interface Requiredif27 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId27;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface StyleCode {
        control: string;
        label: string;
        options: Option13[];
        sort: number;
        required: boolean;
        requiredif: Requiredif27;
    }

    export interface Option14 {
        disabled: boolean;
        selected: boolean;
        text: string;
    }

    export interface TypeId28 {
    }

    export interface Requiredif28 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId28;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface Engine {
        control: string;
        label: string;
        options: Option14[];
        sort: number;
        required: boolean;
        requiredif: Requiredif28;
    }

    export interface Option15 {
        disabled: boolean;
        selected: boolean;
        text: string;
        value: string;
    }

    export interface TypeId29 {
    }

    export interface Requiredif29 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId29;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface Usecode {
        control: string;
        label: string;
        options: Option15[];
        sort: number;
        required: boolean;
        requiredif: Requiredif29;
    }

    export interface Option16 {
        disabled: boolean;
        selected: boolean;
        text: string;
        value: string;
    }

    export interface LengthOwned {
        control: string;
        label: string;
        options: Option16[];
        sort: number;
        required: boolean;
    }

    export interface DailyMiles {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
    }

    export interface TypeId30 {
    }

    export interface Requiredif30 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId30;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface Miles1Way {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
        requiredif: Requiredif30;
    }

    export interface TypeId31 {
    }

    export interface Requiredif31 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId31;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface AnnualMiles {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
        requiredif: Requiredif31;
    }

    export interface Option17 {
        selected: boolean;
        text: string;
        value: boolean;
    }

    export interface TypeId32 {
    }

    export interface Requiredif32 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId32;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface RideSharing {
        control: string;
        type: string;
        label: string;
        options: Option17[];
        sort: number;
        required: boolean;
        requiredif: Requiredif32;
    }

    export interface Option18 {
        disabled: boolean;
        selected: boolean;
        text: string;
        value: string;
    }

    export interface TypeId33 {
    }

    export interface Requiredif33 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId33;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface Ownership {
        control: string;
        label: string;
        options: Option18[];
        sort: number;
        required: boolean;
        requiredif: Requiredif33;
    }

    export interface Option19 {
        selected: boolean;
        text: string;
        value: boolean;
    }

    export interface TypeId34 {
    }

    export interface Requiredif34 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId34;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface LienHolder {
        control: string;
        type: string;
        label: string;
        options: Option19[];
        sort: number;
        required: boolean;
        requiredif: Requiredif34;
    }

    export interface TypeId35 {
    }

    export interface Requiredif35 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId35;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface Lhname {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
        requiredif: Requiredif35;
    }

    export interface TypeId36 {
    }

    export interface Requiredif36 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId36;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface Lhaddress1 {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
        requiredif: Requiredif36;
    }

    export interface TypeId37 {
    }

    export interface Requiredif37 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId37;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface Lhzipcode {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
        requiredif: Requiredif37;
    }

    export interface TypeId38 {
    }

    export interface Requiredif38 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId38;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface Lhstate {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
        requiredif: Requiredif38;
    }

    export interface Vehicle2 {
        id: Id2;
        isLastVehicle: IsLastVehicle;
        addAnotherVehicle: AddAnotherVehicle;
        vehicleNumber: VehicleNumber;
        isoVinNumber: IsoVinNumber;
        actualValue: ActualValue;
        costNew: CostNew;
        strictValidation: StrictValidation2;
        imsControl: ImsControl;
        quickLookup: QuickLookup;
        fullLookup: FullLookup;
        vinNumber: VinNumber;
        year: Year;
        make: Make;
        modelDescription: ModelDescription;
        trimCode: TrimCode;
        styleCode: StyleCode;
        engine: Engine;
        usecode: Usecode;
        lengthOwned: LengthOwned;
        dailyMiles: DailyMiles;
        miles1Way: Miles1Way;
        annualMiles: AnnualMiles;
        rideSharing: RideSharing;
        ownership: Ownership;
        lienHolder: LienHolder;
        lhname: Lhname;
        lhaddress1: Lhaddress1;
        lhzipcode: Lhzipcode;
        lhstate: Lhstate;
    }

    export interface TypeId39 {
    }

    export interface Requiredif39 {
        dependentProperty: string;
        targetValue: boolean;
        targetOperator: number;
        typeId: TypeId39;
        requiresValidationContext: boolean;
        errorMessageResourceName: string;
        errorMessageResourceType: string;
    }

    export interface AddressType {
        control: string;
        type: string;
        label: string;
        sort: number;
        required: boolean;
        requiredif: Requiredif39;
    }

    export interface Fields {
        id: Id;
        disableValidation: DisableValidation;
        firstName: FirstName;
        lastName: LastName;
        address: Address;
        unit: Unit;
        state: State;
        zipCode: ZipCode;
        phone: Phone;
        email: Email;
        dob: Dob;
        driver: Driver2;
        yearsAtAddress: YearsAtAddress;
        monthsAtAddress: MonthsAtAddress;
        howHeard: HowHeard;
        quote: Quote2;
        sr22: Sr222;
        vehicle: Vehicle2;
        addressType: AddressType;
    }

    export interface RootObject {
        sid: string;
        currentUrl: string;
        form: Form;
        fields: Fields;
    }

}

