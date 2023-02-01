import {Injectable} from "@angular/core";
import {saveAs} from "file-saver";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  exportToJson(data: any) {
    return saveAs(new Blob([JSON.stringify(data, null, 2)], {type: 'JSON'}), 'stockvalues.json');
  }
}
