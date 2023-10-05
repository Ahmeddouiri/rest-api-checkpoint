import React, { useEffect, useState } from 'react'
import MovieCard from '../MovieCard/MovieCard';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Button } from 'react-bootstrap';
import axios from 'axios';

function MovieList() {


  const [listofmovie, setListofmovie] = useState([]);
  const [movietitle, setMovietitle] = useState("");
  const [movierate, setMovierate] = useState("");
  // INPUT ADD
  const [inputTile, setInputTitle] = useState("");
  const [inputYear, setInputYear] = useState("");
  const [inputrate, setInputrate] = useState("");
  const [inputdescription, setInputdescription] = useState("");
  const [inputposterURL, setInputposterURL] = useState("");
  // INPUT EDITE

  const [inputTile2, setInputTitle2] = useState("");
  const [inputYear2, setInputYear2] = useState("");
  const [inputrate2, setInputrate2] = useState("");
  const [inputdescription2, setInputdescription2] = useState("");
  const [inputposterURL2, setInputposterURL2] = useState("");
  // OTHER
  const [loading, setLoading] = useState(true);
  const [editid, setEditid] = useState(null)
  //OLD ADD FUNCTION
  // const add = () => {
  //   let url = inputposterURL.toString()
  //   let ratenew
  //   if(inputrate>10)
  //   { ratenew = 1}
  //   else{ ratenew = inputrate}
  //   const newMovie = {
  //     Title: inputTile,
  //     Year: inputYear,
  //     rate: ratenew,
  //     description: inputdescription,
  //     posterURL: url
  //   };
  //     console.log(newMovie)
  //   setListofmovie([...listofmovie, newMovie]);

  //   // Clear input fields
  //   setInputTitle('');
  //   setInputYear('');
  //   setInputrate('');
  //   setInputdescription('');
  //   setInputposterURL('');
  // };

  //// ADD Movie

  const AddMovie = async () => {

    let url = inputposterURL.toString()
    let ratenew
    if (inputrate > 10) { ratenew = 1 }
    else { ratenew = inputrate }


    try {
      const response = await axios.post('http://localhost:5008/addMovie',
        {
          Title: inputTile,
          Year: inputYear,
          rate: ratenew,
          description: inputdescription,
          posterURL: url
        })
      console.log(response.data);

      setListofmovie([...listofmovie, response.data])
      // Clear input fields
      setInputTitle("");
      setInputYear("");
      setInputrate("");
      setInputdescription("");
      setInputposterURL("");
    }
    catch (error) {

      console.error(error);
    }
    setLoading(false)

  }

  /// AFFICHE PERSON
  const getMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5008/getMovies')

      setListofmovie(response.data)
    }
    catch (error) {

      console.error(error);
    }
    setLoading(false)

  }

  useEffect(() => {


    getMovies()

  }, [])

  // DELETE CONTACT
  const DeleteMovie = async (id) => {

    try {
      const id1 = id;
      console.log(id1);
      const response = await axios.delete(`http://localhost:5008/DeleteMoviebyId/${id1}`)
      console.log(response.data);
      getMovies()

    }
    catch (error) {

      console.error(error);
    }
    setLoading(false)

  }

  //EDIT Movie
  const UpdateMovie = async () => {

    try {
      console.log(editid);
      console.log();
      const response = await axios.put(`http://localhost:5008/UpdateMovieById/${editid}`, {
        Title: inputTile2,
        Year: inputYear2,
        rate: inputrate2,
        description: inputdescription2,
        posterURL: inputposterURL2
      })
      console.log(response.data);
      setEditid(null)
      getMovies()

    }
    catch (error) {

      console.error(error);
    }
    setLoading(false)

  }
  return (
    <>

      <Row className="justify-content-md-center">
        <Col md={{ span: 6, offset: 3 }}>
          <Form className="align-self-center  w-50 p-3 mt-5  ">
            <Card.Body>
              <Card.Title>Add Movie</Card.Title>
              <Form.Control onChange={(e) => { setInputTitle(e.target.value) }} placeholder="Title" />
              <Form.Control onChange={(e) => { setInputYear(e.target.value) }} placeholder="Year " />
              <Form.Control onChange={(e) => { setInputrate(e.target.value) }} placeholder="rate" />
              <Form.Control onChange={(e) => { setInputdescription(e.target.value) }} placeholder="description" />
              <Form.Control onChange={(e) => { setInputposterURL(e.target.value) }} placeholder="posterURL" />
              <Button onClick={() => AddMovie()} >Add</Button>
            </Card.Body>
          </Form>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col md={{ span: 6, offset: 3 }}>
          <Form className="align-self-center  w-50 p-3 mt-5  ">
            <Card.Body>
              <Card.Title>Search Fiter</Card.Title>
              <Form.Group className="mb-3">
                <Form.Label>Search with Title</Form.Label>
                <Form.Control
                  onChange={(e) =>
                    setMovietitle(e.target.value)
                  }
                  placeholder="Title"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Search By Rate </Form.Label>
                <Form.Control
                  onChange={(event) =>
                    setMovierate(event.target.value)
                  }
                  placeholder="Rate"
                />
              </Form.Group>

            </Card.Body>
          </Form>
        </Col>
      </Row>

      <Container>
        {loading && <div>Loading</div>}
        {!loading && (
          <Card.Body>
            <Card.Title className="mb-3 " ><h2>Liste Of Movies</h2></Card.Title>
            <Row md={4}>
              {listofmovie.filter((movie) => movie.Title.toLowerCase().includes(movietitle
                .toLowerCase()) && movie.rate.toLowerCase().includes(movierate
                  .toLowerCase())).map((movie, key) => (
                    (editid === movie._id ?

                      <Card.Body>
                        <Card.Title>edite movie : {movie.Title} Movie</Card.Title>
                        <Form.Control value={inputTile2} onChange={(e) => { setInputTitle2(e.target.value) }} placeholder="Title" />
                        <Form.Control value={inputYear2} onChange={(e) => { setInputYear2(e.target.value) }} placeholder="Year " />
                        <Form.Control value={inputrate2} onChange={(e) => { setInputrate2(e.target.value) }} placeholder="rate" />
                        <Form.Control value={inputdescription2} onChange={(e) => { setInputdescription2(e.target.value) }} placeholder="description" />
                        <Form.Control value={inputposterURL2} onChange={(e) => { setInputposterURL2(e.target.value) }} placeholder="posterURL" />
                        <Button onClick={() => UpdateMovie()} >save</Button><span>  </span> 
                        <Button onClick={() => {setEditid(null)}} >Cancel</Button>
                      </Card.Body> :
                      <Row style={{ height: "auto" }} >



                        <Row>
                          <MovieCard
                            key={key}
                            Title={movie.Title}
                            Year={movie.Year}
                            rate={movie.rate}
                            description={movie.description}
                            posterURL={movie.posterURL}
                            id={movie.id}
                          />
                        </Row>

                        <button type="button" class="btn btn-outline-danger" style={{ height: "auto" }} onClick={() => { DeleteMovie(movie._id) }} >Delete</button>
                        <button type="button" class="btn btn-outline-info"
                          onClick={() => {
                            setEditid(movie._id)
                            setInputTitle2(movie.Title);
                            setInputYear2(movie.Year);
                            setInputrate2(movie.rate);
                            setInputdescription2(movie.description);
                            setInputposterURL2(movie.posterURL);

                          }}
                        >Edite</button>

                      </Row>
                    )
                  ))}


            </Row>
          </Card.Body>)}
      </Container>

    </>
  )
}

export default MovieList