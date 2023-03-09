import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

import { map, Observable } from 'rxjs';
import { User } from '../models/users';



@Injectable({
  providedIn: 'root'
})

export class UsersService{

    constructor(private http:HttpClient){

    }

    getUsers(): Observable<User[]>{
        return this.http.get<User[]>('http://localhost:3000/api/v1/user');
    }

    getUser(userId:string): Observable<User>{
        return this.http.get<User>(`http://localhost:3000/api/v1/user/${userId}`);
    }

    createUser(user:User): Observable<User>{
        return this.http.post<User>('http://localhost:3000/api/v1/user/',user);
    }

    deleteUser(userId:string): Observable<any>{
        return this.http.delete<any>(`http://localhost:3000/api/v1/user/${userId}`)
    }
    
    updateUser(user: User,userId:string): Observable<User>{
        return this.http.put<User>(`http://localhost:3000/api/v1/user/${userId}`,user);
    }

    getCount(): Observable<number> {
        return this.http.get<number>(`http://localhost:3000/api/v1/user/get/count`)
    }

    
}