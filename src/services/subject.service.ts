import { AppDataSource } from '../database/AppDataSource';
import { Subject } from '../models/subject.entity';
import { Class } from '../models/class.entity';
import { Teacher } from '../models/teacher.entity';
import CreateSubjectDto from '../dto/subject.dto';
import SubjectWithThatIDNotExistsException from '../exceptions/subject/SubjectWithThatIDNotExistsException';
import SubjectWithThatNameAlreadyExistsException from '../exceptions/subject/SubjectWithThatNameAlreadyExistsException';
import NoSubjectFoundException from '../exceptions/subject/NoSubjectFoundException';
import InternalErrorException from '../exceptions/InternalErrorException';
import TeacherWithThatIDNotExistsException from '../exceptions/subject/TeacherWithThatIDNotExistsException';
import ClassWithThatIDNotExistsException from '../exceptions/subject/ClassWithThatIDNotExistsException';
import TeacherWithIdAlreadyExistInClassException from '../exceptions/subject/TeacherWithIdAlreadyExistInClassException';


export class SubjectService{

    public classRepository;
    public subjectRepository;
    public teacherRepository;

    constructor(){
        
        this.classRepository=AppDataSource.getRepository(Class);
        this.subjectRepository=AppDataSource.getRepository(Subject);
        this.teacherRepository=AppDataSource.getRepository(Teacher);
        
    }


    public async GetAllSubjects(id_class:number){

        const classe =await this.classRepository.findOneBy({id:id_class});

        if (classe) {
            const subjects= await this.subjectRepository 
                .createQueryBuilder("subject")
                .leftJoinAndSelect("subject.classe","class")
                .leftJoinAndSelect("subject.teacher","teacher")
                .where("class.id = :id_class",{id_class:id_class})
                .getMany();
        
            if (subjects && JSON.stringify(subjects)!='[]') {
                return subjects;
            } else {
                throw new NoSubjectFoundException();
            }
        } else {
            throw new ClassWithThatIDNotExistsException(id_class);
        }

        
    
        
    }

    public async CreateSubject(id_class:number,subject:CreateSubjectDto){

        const isAlreadyExist1 =  await this.subjectRepository
                .createQueryBuilder("subject")
                .leftJoinAndSelect("subject.classe","class")
                .where("subject.name = :name",{name:subject.name})
                .andWhere("class.id = :id",{id:id_class})
                .getOne();
        // const isAlreadyExist2 =  await this.subjectRepository
        //         .createQueryBuilder("subject")
        //         .leftJoinAndSelect("subject.teacher","teacher")
        //         .leftJoinAndSelect("subject.classe","class")
        //         .where("teacher.id = :id",{id:subject.id_teacher})
        //         .andWhere("class.id = :id",{id:id_class})
        //         .getOne();
        if (isAlreadyExist1) {
            throw new SubjectWithThatNameAlreadyExistsException(subject.name,isAlreadyExist1.classe.name);
        }  
        // else if (subject.id_teacher && isAlreadyExist2) {
        //     throw new TeacherWithIdAlreadyExistInClassException(subject.id_teacher,isAlreadyExist2.classe.name)
        // }
        else {
            
            const classe =await this.classRepository.findOneBy({id:id_class});

            if (classe) {

                if (subject.id_teacher!=null && typeof(subject.id_teacher)==='number') {
                    const teacher = await this.teacherRepository.findOneBy({id:subject.id_teacher});
        
                    if (teacher) {
                        
                            const newSubject = new Subject();
                            newSubject.name=subject.name;
                            newSubject.classe=classe;
                            newSubject.teacher=teacher;
                            const created = await this.subjectRepository.save(newSubject);
                            
                            teacher.classes=[classe];
                            const result = await this.teacherRepository.save(teacher);

                            console.log(created);
                            if (created) {
                                return created;
                                
                            }
                    }
                    else {
                            
                            throw new TeacherWithThatIDNotExistsException(subject.id_teacher)

                    }
                    
                    
                }
                else{
                    const newSubject = new Subject();
                    newSubject.name=subject.name;
                    newSubject.classe=classe;
                    const created = await this.subjectRepository.save(newSubject);

                    console.log(created);
                    if (created) {
                        return created;
                        
                    }

                }

                

                const newSubject = new Subject();
                newSubject.name=subject.name;
                newSubject
                
            } 
            else {
                throw new ClassWithThatIDNotExistsException(id_class);
            }


        }
    
            

        
    }

    public async GetSubjectById(id_class:number,id_subject:number){
        
        const classe =await this.classRepository.findOneBy({id:id_class});

        if (classe) {
            const subject= await this.subjectRepository 
                .createQueryBuilder("subject")
                .leftJoinAndSelect("subject.classe","class")
                .leftJoinAndSelect("subject.teacher","teacher")
                .where("subject.id = :id_subject",{id_subject:id_subject})
                .andWhere("class.id = :id_class",{id_class:id_class})
                .getOne();
        
            if (subject) {
                return subject;
            } else {
                throw new SubjectWithThatIDNotExistsException(id_subject);
            }
        } else {
            throw new ClassWithThatIDNotExistsException(id_class);
        }
        

    }



    public async UpdateSubject(subject:CreateSubjectDto,id_class:number,id_subject:number){
    
        const classe =await this.classRepository.findOneBy({id:id_class});

        if (classe) {

            const isAlreadyExist1 =  await this.subjectRepository
                .createQueryBuilder("subject")
                .leftJoinAndSelect("subject.classe","class")
                .where("subject.name = :name",{name:subject.name})
                .andWhere("class.id = :id",{id:id_class})
                .getOne();
               
            const subjectUpdate= await this.subjectRepository 
                .createQueryBuilder("subject")
                .leftJoinAndSelect("subject.classe","class")
                .leftJoinAndSelect("subject.teacher","teacher")
                .where("subject.id = :id_subject",{id_subject:id_subject})
                .andWhere("class.id = :id_class",{id_class:id_class})
                .getOne();
            if (isAlreadyExist1 && isAlreadyExist1.id!=subjectUpdate?.id) {
                throw new SubjectWithThatNameAlreadyExistsException(subject.name,isAlreadyExist1.classe.name);
            } 
            
            if (subjectUpdate) {
                if (subject.id_teacher!=null && typeof(subject.id_teacher)==='number') {
                    const teacher = await this.teacherRepository.findOneBy({id:subject.id_teacher});
                    
                    if (teacher) {

                        if (subjectUpdate.teacher) {
                    
                            let del_teacher= await this.teacherRepository
                                    .createQueryBuilder("teacher")
                                    .leftJoinAndSelect("teacher.classes","classe")
                                    .where("teacher.id= :id_teacher",{id_teacher:subjectUpdate.teacher.id})
                                    .getOne()

                            if (del_teacher ) {
                                const teacherisAnothersubject = await this.subjectRepository
                                            .createQueryBuilder("subject")
                                            .leftJoinAndSelect("subject.teacher","teacher")
                                            .where("teacher.id = :id_teacher",{id_teacher:del_teacher.id})
                                            .getMany()
                                if (teacherisAnothersubject.length==1) {
                                    del_teacher.classes=del_teacher.classes.filter(cl=>{return cl.id!= classe.id});                    
                                
                                    const result1 = await this.teacherRepository.save(del_teacher);
                                    console.log(result1)
                                }


                                
                                
                            }
                            
                        }
                        subjectUpdate.name=subject.name;
                        subjectUpdate.teacher=teacher;
                        const result = await this.subjectRepository.save(subjectUpdate);
                        
                        let sav_teacher_class= await this.teacherRepository
                                .createQueryBuilder("teacher")
                                .leftJoinAndSelect("teacher.classes","classe")
                                .where("teacher.id= :id_teacher",{id_teacher:teacher.id})
                                .getOne()
                        if (sav_teacher_class) {
                            sav_teacher_class.classes.push(classe);
                            const result2 = await this.teacherRepository.save(sav_teacher_class);
                            console.log(result2);
                            
                        }
        
                        if (result) {
                            return result;
                        } else {
                            throw new InternalErrorException();
                        }

                    } else {
                        throw new TeacherWithThatIDNotExistsException(subject.id_teacher)
                    }
                } else{
                    subjectUpdate.name=subject.name;

                    const result = await this.subjectRepository.save(subjectUpdate);

                        if (result) {
                            return result;
                        } else {
                            throw new InternalErrorException();
                        }

                }


            } else {
                throw new SubjectWithThatIDNotExistsException(id_subject);
            }
            
        }
        else{
            throw new ClassWithThatIDNotExistsException(id_class);
        }
    }





    public async DeleteSubject(id_class:number,id_subject:number){ 

        const classe =await this.classRepository.findOneBy({id:id_class});

        if (classe) {
            const subject= await this.subjectRepository 
                .createQueryBuilder("subject")
                .leftJoinAndSelect("subject.classe","class")
                .where("subject.id = :id_subject",{id_subject:id_subject})
                .andWhere("class.id = :id_class",{id_class:id_class})
                .getOne();
        
            if (subject) {
                const result = await this.subjectRepository.delete(id_subject);
                return id_subject;
            } else {
                throw new SubjectWithThatIDNotExistsException(id_subject);
            }
        } else {
            throw new ClassWithThatIDNotExistsException(id_class);
        }
        

    }




}