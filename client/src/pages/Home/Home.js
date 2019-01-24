import React, {Component} from "react";
import API from "../../utils/API";
import MsgCenter from "../../components/msgCenter";
import Jumbotron from "../../components/Jumbotron";
import Notification from "../../components/Notification";
import Card from "../../components/Card";
import { Input, FormBtn, DropDownList} from "../../components/Form";
import openSocket from 'socket.io-client';
import "./Home.css";

const socket = openSocket();

class Home extends Component {
    constructor(){
        super()
        socket.on("saved", message => {
            const newNotification = this.state.notification;
            newNotification.push(message);
            console.log(message);
            this.setState({ notification: newNotification})
        });
        socket.on("scraped", message => {
            const newNotification = this.state.notification;
            newNotification.push(message);
            console.log(message);
            this.setState({ notification: newNotification })
        })
    };
    
    state = {
        article: [],
        saved: [],
        _id: "",
        title: "",
        numArticle: 5,
        date: "",
        teaser: "",
        note: "",
        startYear: "",
        endYear: "",
        message: "",
        notification:[],
    };

    handleForSearch = event => {
        event.preventDefault();
        if (!this.state.title) {
            console.log("title cannot be empty");
        }
        if (!this.state.endYear) {
            console.log("end year is empty");
        }
        if (!this.state.startYear) {
            console.log("start year is empty)");
        }
        if (this.state.title) {
            socket.emit('scraped', {"title" : this.state.title})
            API.getNews(this.state.title, this.state.startYear, this.state.endYear).then(res => {
                console.log("articles", res.data.response.docs);

                this.setState({ article: res.data.response.docs.slice(0, this.state.numArticle) });
            });
        } else {
            this.setState({ message: "Title cannot be empty" });
        }
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        console.log(event.target.name);
        console.log(event.target.value);
        this.setState({ [name]: value });
        console.log(this.state);
    };
    loadArticle = () => {
        console.log("getting articles");
        API.getArticles()
            .then(res => {
                console.log("load article", res);
                this.setState({ saved: res.data, title: "", endYear: "", startYear: "", date: "", teaser: "", message: "", note: "" });
            })
            .catch(err => console.log(err))
    };
    handleFormSubmit = id => {
        const article = this.state.article.find((item) => item._id === id);
        console.log("article found! ", article);
        const newArticle = {
            title: article.headline.main,
            date: article.pub_date,
            teaser: article.snippet,
            link: article.web_url
        }
        console.log("New article: ", newArticle);
        API.saveArticle(newArticle)
            .then(() => {
                socket.emit('saved', { "title": newArticle.title });
                this.setState({
                    message: "Article has been saved!",
                    article: [],
                    title: "",
                    endYear: "",
                    startYear: ""
                })
                setTimeout(() => {
                    this.loadArticle()
                }, 1000);
            });
    };
    handleDelete = id => {
        console.log("here");
        API.deleteArticle(id)
            .then(res => {
                console.log(res);
                this.setState({
                    message: "Saved article has been removed from the list."
                })
                setTimeout(() => {
                    this.loadArticle();
                }, 1000);
            })
            .catch(err => console.log(err))
    };
    handleClearResult = (event) => {
        event.preventDefault();
        this.setState({
            article: [],
            title: "",
            endYear: "",
            startYear: ""
        });
    };
    handleNewNote = (id, event) => {
        event.preventDefault();
        console.log("handling new note");
        API.saveNote(id, {
            note: this.state.note,
            date: Date().Now
        })
            .then(res => {
                console.log(res);
                this.loadArticle();
                this.setState({ note: "" });
            })
    };
    componentDidMount(){
        this.loadArticle();
    };
    
    render(){
        return(
        <div>
            <Jumbotron>
                
            </Jumbotron>
            {this.state.notification ? 
                <div className="notification-container">
                    <Notification notification={this.state.notification} />
                </div>
            :
                null
            }
            {this.state.message ? <MsgCenter msg={this.state.message} className="text-center alert alert-danger" /> : ""}
            <form className="container">
                <b>Search Term:</b>
                <Input onChange={this.handleChange} name='title' value={this.state.title}>
                    
                </Input>
                <b>Number of Records to Retrieve:</b>
                <DropDownList name="numArticle" onChange={this.handleChange} li={[1,5,10]} SelectedValue={this.state.numArticle} value={this.state.numArticle}></DropDownList>
                <b>Start Year (Optional):</b>
                    <Input onChange={this.handleChange} name='startYear' value={this.state.startYear}>

                </Input>
                <b>End Year (Optional):</b>
                    <Input onChange={this.handleChange} name='endYear' value={this.state.endYear}>
                </Input>
                    <FormBtn onClick={this.handleForSearch} className="btn btn-success" float="right">Search</FormBtn>
                    <FormBtn onClick={() => this.handleClearResult} className="btn btn-danger" float="left">Clear Results</FormBtn>
            </form>
            <br /><br />
            <div className="container">
                {this.state.article.length > 0? <h1>News</h1> : ""}
                {this.state.article.map(item => 
                    <Card 
                        key={item._id}
                        id={item._id}
                        title={item.headline.main} 
                        h1="News"
                        article = 'new'
                        date={item.pub_date} 
                        teaser={item.snippet} 
                        link={item.web_url} 
                        handleSubmit = {this.handleFormSubmit}
                        /> 
                )}
                <br /><br />
                {this.state.saved.length > 0 ? <h1>Saved Articles</h1> : ""}
                {this.state.saved.map(item =>
                    <Card
                        key={item._id}
                        id={item._id}
                        article = 'saved'
                        h1="Saved Articles"
                        title={item.title}
                        date={item.date}
                        link = {item.link}
                        teaser= {item.teaser}
                        savedNotes = {item.note}
                        onChange = {this.handleChange}
                        handleNewNote = {this.handleNewNote}
                        handleDelete={this.handleDelete} />

                )}
            </div>
        </div>
    )};
};

export default Home;
