import React from 'react';
import Moment from 'react-moment';
import DeleteBtn from '../../components/DeleteBtn';
import SaveBtn from '../../components/SaveBtn';
import {Input, FormBtn} from '../../components/Form';
import './Card.css'

const Card = props => (
    <div style={{clear: "both", paddingBottom : "20px" }} className="card container-fluid">
        {/*<img className="card-img-top" src={props.image} alt={props.title} /> */}
        <div className='card-body article-body'>
            <div className="row">
                <div className="col-md-10">
                    <h2 className='card-title'>{props.title}</h2>
                    <span>
                        Date published:
                <Moment format="YYYY-MM-DD">
                            {props.date}
                        </Moment>
                    </span>
                    <p className='card-text'>
                        {props.teaser}
                        &nbsp; &nbsp;<a href={props.link} className='card-link'>... Read more</a>
                    </p>
                </div>
                <div className="col-md-2">
                    {props.article === 'saved' ? 
                        <DeleteBtn handleDelete={props.handleDelete} id={props.id} className="btn btn-danger delete-btn" /> 
                        : 
                        <SaveBtn handleSubmit={props.handleSubmit} id={props.id} /> 
                    }
                </div>
            </div>
            
            
            {props.article === 'saved' ?
                <div className="container-fluid">
                    <div className="row">
                        <div className="comment">
                            <h3>Note{props.savedNotes.length >1 ? `s` : ``}</h3>
                            {props.savedNotes.map((x, i) => {
                                return (
                                    <div key={i} className="card bg-light mb-3">
                                        <div className="card-body">
                                            <label>{x.note}</label> <br />
                                            <label className="text-right" style={{float: `right`}}>Date Saved:
                                            <Moment format="YYYY-MM-DD">
                                                {x.date}
                                            </Moment>

                                            </label>
                                        </div>
                                    </div>
                                )
                            })}
                            <form>
                                <div className="form-group row">
                                    <div className='col-10'>
                                        <Input style={{width: `100%`}} type='text' name="note" className='form-control' aria-label='new note' onChange={props.onChange} placeholder="write new note here.." />
                                    </div>
                                    <div className="col-2">
                                        <FormBtn onClick={(event) => props.handleNewNote(props.id, event)} float='right' className="btn btn-success" id={props.id}>Save Note</FormBtn>
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                    </div>
                </div>
                :
                null
            }
        </div>
    </div>
);

export default Card;
