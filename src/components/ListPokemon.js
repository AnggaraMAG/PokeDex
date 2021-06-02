import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DialogDetail from './DialogDetail'

function ListPokemon() {
  const [data, setData] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [namePokemon, setNamePokemon] = useState("")


  const getData = async (pageNumber) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${pageNumber}&limit=10`
    const result = await axios.get(url).then((res) => res).catch((err) => err.response)
    // setData(result.data.results)
    const data = result.data.results
    // console.log(`result`, data)
    setData(val => [...val, ...data])
    setLoading(true)
  }

  useEffect(() => {
    getData(pageNumber)
  }, [pageNumber])


  const loadMore = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 10)
  }

  const handleOpenDialog = (param) => {
    // console.log(`paramm`, param.name)
    setNamePokemon(param.name)
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
  }

  const pageEnd = useRef()
  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      }
        , { threshold: 1 })
      observer.observe(pageEnd.current)
    }
  }, [loading])
  return (
    <div className="App">
      <DialogDetail
        open={openDialog}
        handleClose={handleClose}
        namePokemon={namePokemon}
      />
      <h1>PokeDex</h1>
      <div style={{
        textAlign: 'center', justifyContent: 'center', alignItems: 'center'
      }}>
        <Grid
          container
          justify="center"
          direction="column"
          alignItems="center">
          {
            data.map((n) => {
              return (
                <List component="div" style={{ width: '50%' }} onClick={() => handleOpenDialog(n)}>
                  <Paper elevation={3} style={{ marginBottom: 20 }} key={n.id}>
                    <ListItem style={{ textAlign: 'center', width: '100%' }} button>
                      <ListItemText primary={n.name.toUpperCase()} />
                    </ListItem>
                  </Paper>
                </List>
              )
            })
          }
        </Grid>
      </div>
      <div>
        {/* <img src={loading} /> */}
      </div>
      <div>
        <h3>{data.length}</h3>
      </div>
      <Button variant="contained" color="primary" style={{ marginBottom: 10 }} onClick={loadMore} ref={pageEnd}>
        Load More...
      </Button>
    </div>
  )
}

export default ListPokemon
