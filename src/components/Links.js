import React, {useEffect, useState} from 'react';
import LinkForm from './LinkForm';
import { toast } from 'react-toastify';
import {db} from '../firebase';

const Links = () => {

    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('');

    const addOrEditLink = async (linkObject) => {
     
        try {
            if(currentId == ''){
                await db.collection('links').doc().set(linkObject);
                 toast('Nuevo registro agregado',{
                type: 'success'
                });
           }else{
               await db.collection('links').doc(currentId).update(linkObject);
               toast('Registro actualizado exitosamente',{
                type: 'info'
                });
                setCurrentId('');  
           }
        } catch (error) {
            console.error(error);
        }

    }

    const onDeleteLink = async (id) => {
       if(window.confirm('Estas seguro que quieres eliminar?')){
          await db.collection('links').doc(id).delete();
          toast('Registro eliminado exitosamente',{
            type: 'error',
            autoClose: 2000
        })
       }
    }

    const getLinks = () => {
      db.collection('links').onSnapshot((querySnapshot) =>{
          const docs = [];
        querySnapshot.forEach(doc => {
            docs.push({...doc.data(), id: doc.id});
        });
        setLinks(docs);
    });
    }

    useEffect(() => {
        getLinks();
    }, []);

    return <div className="col-md-12">
    <div className="row">
        <div className="col-md-4">
            <LinkForm {...{addOrEditLink, currentId, links}}/>
        </div>
        <div className="col-md-8">
            {links.map(link => (
                <div className="card mb-1" key={link.id}>
                    <div className="card-body">
                        <div className="text-right">
                        <button className="btn btn-info" onClick={() => setCurrentId(link.id)}><i className="fas fa-edit"></i></button>
                        <button className="btn btn-danger" onClick={() => onDeleteLink(link.id)}><i className="fas fa-trash"></i></button>
                        </div>
                        <h4>{link.name}</h4>
                        <p>{link.description}</p>
                        <div className="form-check">
                        <input disabled checked={link.check} className="form-check-input" type="checkbox" name="check" />
                         <label className="form-check-label"> Actividad realizada</label>
                        </div>
                        <ul>
                        {link.cats.map(function (value, index) {
                            return <li key={index}>{value}</li>
                        })
                        }

                        </ul>
                    </div>
                </div>
            ))}
        </div>
        </div>
    </div>
}

export default Links;
