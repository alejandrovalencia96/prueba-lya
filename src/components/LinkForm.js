import React, {useState, useEffect} from 'react';
import {db} from '../firebase';


const LinkForm = (props) => {

  


    let initialStateValues = {
        name: '',
        description: '',
        items: '',
        cats: [],
        check:false
    };

    const [values, setValues] = useState(initialStateValues);

    const handleInputChange = e => {
      
       
        const {name, value} = e.target;

        
        setValues({...values, [name]: value})

                    


       
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.addOrEditLink(values);
        setValues({...initialStateValues});
        console.log(values);
    }

    const getLinkById = async (id) => {
      const doc = await db.collection('links').doc(id).get();
        setValues({...doc.data()});
    }

    useEffect(() => {
        if(props.currentId === '') {
            setValues({...initialStateValues});
        }else{
            getLinkById(props.currentId);
        }

        
    }, [props.currentId]);



    const obtenerDatos = async() => {
       const obj = [];
       const {items} = values;
       console.log(items);
       const data = await fetch(`https://catfact.ninja/facts?limit=${items}&max_length=140`);
       const catsItems = await data.json();

        
       catsItems.data.map((material) => {
        obj.push(material.fact);
      });

      setValues({
        name: values.name,
        description: values.description,
        items: values.items,
        cats: obj,
        check: false
      });

    };


    

    return (
        <form className="card card-body mb-1" onSubmit={handleSubmit}>

            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="fas fa-user"></i>
                </div>
                <input onChange={handleInputChange} type="text" className="form-control" name="name" value={values.name} placeholder="Nombre de la actividad" />
            </div>

            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="fas fa-edit"></i>
                </div>
                <textarea onChange={handleInputChange} name="description" rows="3" className="form-control" value={values.description} placeholder="Escriba una descripción"></textarea>
            </div>


           


            <div className="form-group">
                <div className="input-group mb-3">
                <input onChange={handleInputChange} type="number" className="form-control" name="items" placeholder="Numero de frases" value={values.items} />
                    <div className="input-group-append">
                     <button className="btn btn-outline-primary" onClick={() => obtenerDatos()} type="button">
                         <i className="fas fa-plus"></i>
                     </button>
                    </div>
                </div>
                <div className="small">Recuerda que para añadir frases debes presionar el boton de +</div>

            </div>


            <ul>
                     {values.cats.map(function (value, index) {
                            return <li key={index}>{value}</li>
                        })
                     }
            </ul>


            <div className="form-check">
                <input onChange={e => {
                  let checked = e.target.checked;
                  setValues({...values, check : checked})
                }}
                value= {values.check}
                checked={values.check} className="form-check-input" type="checkbox" name="check" />
                <label className="form-check-label"> Actividad realizada</label>
            </div>

            <button className="btn btn-primary btn-block">{props.currentId === '' ? 'Guardar' : 'Editar'}</button>

        </form>
    )
}

export default LinkForm;