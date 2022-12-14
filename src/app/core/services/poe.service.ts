import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { filter, map, take } from 'rxjs/operators';
import { Poe } from '../models/poe';
import { PoeDto } from 'src/app/poes/dto/poe-dto';
import { from, Observable } from 'rxjs';
import { TypeofExpr } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class PoeService {
  
  private controllerBaseUrl!: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.controllerBaseUrl = `${environment.apiBaseUrl}/poe`;
  }

  public findAll(): Observable<Poe[]> {
    return this.httpClient.get<any>(this.controllerBaseUrl)
      .pipe(
        take(1),
        map((poes: any[]) => {
          return poes.map((inputPoe: any) => {
            const poe: Poe = new Poe();
            poe.setId(inputPoe.id);
            poe.setTitle(inputPoe.title);
            poe.setPoeType(inputPoe.poeType);
            poe.setBeginDate(new Date(inputPoe.beginDate));
            poe.setEndDate(new Date(inputPoe.endDate));
            poe.setIdAelion(inputPoe.idAelion);
            return poe;
          })
        })
      );
  }

  public findOne(id: number): Observable<Poe> {
    return this.httpClient.get<any>(`${this.controllerBaseUrl}/${id}`)
      .pipe(
        take(1),
        map((inputPoe: any) => {
          const poe: Poe = new Poe();
          poe.setId(inputPoe.id);
          poe.setTitle(inputPoe.title);
          poe.setPoeType(inputPoe.poeType);
          poe.setBeginDate(new Date(inputPoe.beginDate));
          poe.setEndDate(new Date(inputPoe.endDate));
          poe.setIdAelion(inputPoe.idAelion);
          return poe;
        })
      );
  }

  public add(PoeInput: PoeDto): Observable<Poe> {
    return this.httpClient.post<PoeDto>(this.controllerBaseUrl, PoeInput)
      .pipe(
        take(1),
        map((poeDto: PoeDto) => {
          const poe: Poe = new Poe();
          poe.setId(poeDto.id!);
          poe.setTitle(poeDto.title);
          poe.setPoeType(poeDto.poeType);
          poe.setBeginDate(new Date(poeDto.beginDate));
          poe.setEndDate(new Date(poeDto.endDate));
          poe.setIdAelion(poeDto.idAelion);
          return poe;
        })
      );
  }

  public update(poe: Poe): Observable<Poe> {
    return this.httpClient.put<Poe>(`${this.controllerBaseUrl}`, poe)
      .pipe(
        take(1),
        map((anyPoe: any) => {
          const poe: Poe = new Poe();
          poe.setId(anyPoe.id!);
          poe.setTitle(anyPoe.title);
          poe.setPoeType(anyPoe.poeType);
          poe.setBeginDate(new Date(anyPoe.beginDate));
          poe.setEndDate(new Date(anyPoe.endDate));
          poe.setIdAelion(anyPoe.idAelion);
          return poe;
        })
      )
  }

  public delete(poe: Poe): Observable<HttpResponse<any>> {
    return this.httpClient.delete(`${this.controllerBaseUrl}/${poe.getId()}`,
      { observe: 'response' });
  }

  public getAllPoeTypes(): string[] {
    let typesTab: string[] = [];
    let typesSet: Set<string> = new Set<string>();
    this.httpClient.get<any>(this.controllerBaseUrl)
      .pipe(
        take(1),
        map((poes: any[]) => {
          return poes.map((inputPoe: any) => {
            typesSet.add(inputPoe.poeType);
          })
        })
      );
      // for (let type of typesSet) {
      //   typesTab.push(type);
      // }
      typesTab.push("POEC");
      typesTab.push("POEI");
      return typesTab;
  }
}
