// Pages
import Categories from "./pages/Categories.svelte"
import AddCategory from "./pages/AddCategory.svelte"

import Ideas from "./pages/Ideas.svelte"
import AddIdea from "./pages/AddIdea.svelte"

// import Albums from "./pages/albums/Albums.svelte"
// import AlbumDetails from "./pages/albums/AlbumDetails.svelte"

// import Artists from "./pages/artists/Artists.svelte"
// import ArtistDetails from "./pages/artists/ArtistDetails.svelte"
// import CreateArtist from "./pages/artists/CreateArtist.svelte"

export default {
    // Home
    '/': Categories,
    '/home': Categories,
    '/categories': Categories,
    '/addCategory': AddCategory,

    // Ideas
    '/categories/:id': Ideas,
    '/addIdea/:id': AddIdea,
    
    
    // // Artists
    // '/artists': Artists,
    // '/create-artist': CreateArtist,
}