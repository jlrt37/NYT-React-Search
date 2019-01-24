import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  getArticles: function() {
    return axios.get("/api/article");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  getArticle: function(id){
    return axios.get('/api/article/'+id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  deleteArticle: function(id){
    return axios.delete('/api/article/'+id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  saveArticle: function(articleData){
    return axios.post('/api/article', articleData);
  },
  getNews: function(title, startYear, endYear){
    const API_KEY = '7efd7705bed343d498f6b717ffda6638';
    let date = "";
    if(startYear){
      date = "&begin_date=" + startYear +"0101";
      if(endYear){
        date += "&end_date=" + endYear + "1231";  
      }
    }else if(!startYear){
      if(endYear){
        date = "&end_date=" + endYear + "1231";  
      }
    }
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
      API_KEY + "&q=" + title + date;
    return axios.get(queryURL);
  },
  saveNote: function(id, obj) {
    console.log("API : here")
    return axios.post('/api/notes/' +id, obj);
  },
  findNotes: function(id){
    return axios.get('/api/notes/'+id);
  }
};
