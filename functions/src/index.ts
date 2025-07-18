import * as functions from "firebase-functions";
import {drive_v3 as driveV3, google} from "googleapis";
import {EMPTY, forkJoin, from, Observable, of} from "rxjs";
import {catchError, map, switchMap} from "rxjs/operators";
import {MethodOptions} from "googleapis/build/src/apis/abusiveexperiencereport";
import {parse, Options} from "csv-parse";
import {FlightBackEnd, MemberBackEnd, TransactionBackEnd} from "./classes";
interface parseCsvStringResponse {
  response: string[][]
}

let driveAPI!: driveV3.Drive;

/**
 * returns a filtered list of files containing the
 * latest Accounts.csv, Members.csv, and Flights.csv
 * @param {driveV3.Schema$File[]} fullList list of files
 * @return {driveV3.Schema$File[] | undefined}
 */
function filterFileRefs(fullList: Array<driveV3.Schema$File> | undefined)
:Array<driveV3.Schema$File | undefined> {
  let accounts: driveV3.Schema$File | undefined;
  let flights: driveV3.Schema$File | undefined;
  let members: driveV3.Schema$File | undefined;
  fullList?.forEach((file) => {
    if (file.name == "Accounts.csv") {
      if (accounts?.createdTime && file?.createdTime) {
        if (new Date(accounts.createdTime) < new Date(file.createdTime)) {
          accounts = file;
        }
      } else {
        accounts = file;
      }
    }
    if (file.name == "Flights.csv") {
      if (flights?.createdTime && file?.createdTime) {
        if (new Date(flights.createdTime) < new Date(file.createdTime)) {
          flights = file;
        }
      } else {
        flights = file;
      }
    }
    if (file.name == "Members.csv") {
      if (members?.createdTime && file?.createdTime) {
        if (new Date(members.createdTime) < new Date(file.createdTime)) {
          members = file;
        }
      } else {
        members = file;
      }
    }
  });
  return [accounts, flights, members];
}

/**
 * returns a full list of files available
 * @return {void}
 */
function getArrayOfFileRefs()
: Observable<Array<driveV3.Schema$File | undefined>> {
  const params: driveV3.Params$Resource$Files$List = {
    fields: "*",
    q: "trashed=false",
  };
  return from(driveAPI.files.list(params)).pipe(
    map((axios) => filterFileRefs(axios.data.files))
  );
}

/**
 * Gets a file as a UTF8 string
 * @param {driveV3.Schema$File} fileRefs the filtered list of files
 * @param {number} index 0for accounts, 1 for flights and 2 for members
 * @return {void}
 */
function getFile(fileRefs: Array<driveV3.Schema$File | undefined>,
  index: number)
: Observable<string> {
  let fileId!: string | null | undefined;
  if (fileRefs) {
    fileId = fileRefs[index]?.id;
  }
  if (fileId) {
    const params: driveV3.Params$Resource$Files$Get = {
      fileId,
      alt: "media",
    };
    const methodOptions: MethodOptions = {
      responseType: "arraybuffer",
    };
    return from(driveAPI.files.get(
      params,
      methodOptions
    )).pipe(
      map((res) => {
        return Buffer.from(res.data as ArrayBuffer).toString("utf8");
      }),
    );
  } else {
    return EMPTY;
  }
}

/**
 * Ensures Global driveAPI object created
 * @return {void}
 */
function setDriveAPI(): Observable<void> {
  return of("").pipe(
    switchMap(() => {
      if (driveAPI) {
        return of("").pipe(
          map(() => undefined)
        );
      } else {
        return from(google.auth.getClient({
          scopes: ["https://www.googleapis.com/auth/drive"],
        })).pipe(
          map((auth) => {
            const driveV3Options: driveV3.Options = {
              version: "v3",
              auth,
            };
            driveAPI = google.drive(driveV3Options);
          })
        );
      }
    })
  );
}

/**
 * Ensures Global driveAPI object created
 * @param {string} csvString dfdgf
 * @return {parseCsvStringResponse} errgh
 */
function parseCsvString(csvString: string): Promise<parseCsvStringResponse> {
  return new Promise((resolve, reject) => {
    const options: Options = {
      delimiter: ",",
      encoding: "utf8",
    };
    parse(
      csvString,
      options,
      (err: Error | undefined, output: string[][]) => {
        if (err) {
          reject(err);
        } else {
          resolve({response: output});
        }
      }
    );
  });
}

/**
 * get member details from an email
 * @param {string} email member email address (identity)
 * @param {Array<driveV3.Schema$File | undefined>} fileRefs
 * @return {Observable<Globals.Member>}
 */
function getMemberDetails(email: string,
  fileRefs: Array<driveV3.Schema$File | undefined>)
  : Observable<MemberBackEnd | void> {
  if (fileRefs) {
    return getFile(fileRefs, 2).pipe(
      switchMap((utf8) => parseCsvString(utf8)),
      map((csvArray) => {
        let member!: MemberBackEnd | undefined;
        for (let i=1; i < csvArray.response.length; i++) {
          const row = csvArray.response[i];
          if ((row[7]) == email) {
            member = new MemberBackEnd(row[0], row[1],
              row[2], row[3], row[4], row[5], row[6], row[7],
              row[8], row[9], row[10], row[11] == "true" ? true : false,
              row[12], row[13], +row[14], row[15], +row[16], row[17]);
          }
        }
        if (member) {
          return member;
        } else {
          return undefined;
        }
      })
    );
  } else {
    return EMPTY;
  }
}

/**
 * get flights for a member
 * @param {string} memberID member id (identity)
 * @param {Array<driveV3.Schema$File | undefined>} fileRefs
 * @return {Observable<FlightBackEnd>}
 */
function getFlightDetails(memberID: string,
  fileRefs: Array<driveV3.Schema$File | undefined>)
  : Observable< FlightBackEnd[]> {
  const arrFlights = new Array<FlightBackEnd>();
  functions.logger.info("GET FLIGHT DETAILS () - memberID", memberID);
  if (fileRefs) {
    return getFile(fileRefs, 1).pipe(
      switchMap((utf8) => parseCsvString(utf8)),
      map((csvArray) => {
        for (let i=1; i < csvArray.response.length; i++) {
          const row = csvArray.response[i];
          if (((row[1]) == memberID) || (row[2] == memberID)) {
            arrFlights.push(new FlightBackEnd(row[0], row[1],
              row[2], row[3], row[4], row[5], row[6], row[7],
              row[8], row[9], row[10], row[11], row[12], row[13]));
          }
        }
        return arrFlights;
      })
    );
  } else {
    return of(arrFlights);
  }
}

/**
 * get transactions for a member
 * @param {string} memberID member id (identity)
 * @param {Array<driveV3.Schema$File | undefined>} fileRefs
 * @return {Observable<TransactionBackEnd>}
 */
function getTransactions(memberID: string,
  fileRefs: Array<driveV3.Schema$File | undefined>)
  : Observable< TransactionBackEnd[]> {
  const arrTransactions = new Array<TransactionBackEnd>();
  if (fileRefs) {
    return getFile(fileRefs, 0).pipe(
      switchMap((utf8) => parseCsvString(utf8)),
      map((csvArray) => {
        functions.logger.info("GET TRANSACTION() - member id", memberID);
        for (let i=1; i < csvArray.response.length; i++) {
          const row = csvArray.response[i];
          functions.logger.info("GET TRANSACTION() - row[3]", row[4]);
          if ((row[3]) == memberID) {
            arrTransactions.push(new TransactionBackEnd(row[0], row[1],
              row[2], row[3], row[4], row[5], row[6], row[7]));
          }
        }
        return arrTransactions;
      })
    );
  } else {
    return of(arrTransactions);
  }
}

exports.getGlidexFiles = functions.https.onRequest(
  {cors: true}, (request, response) => {
    const email: string = request.query.email as string;
    setDriveAPI().pipe(
      switchMap(() => getArrayOfFileRefs()),
      switchMap((fileRefs) => getMemberDetails(email, fileRefs).pipe(
        switchMap((member) => {
          if (member) {
            return forkJoin([
              getFlightDetails(member.Ref, fileRefs),
              getTransactions(member.Ref, fileRefs),
            ]).pipe(
              map((results) => {
                return response.send(JSON.stringify(
                  {data: [results[0], results[1], member]}
                ));
              })
            );
          } else {
            return of(response.send(JSON.stringify(
              {data: "No member identied"}
            )));
          }
        })
      )),
      catchError((error) => {
        return of(response.send(JSON.stringify({data: error.message})));
      })
    ).subscribe();
  }
);
