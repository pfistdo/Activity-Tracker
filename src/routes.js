// Pages
import Categories from "./pages/Categories.svelte"
import Ideas from "./pages/Ideas.svelte"

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

    // Ideas
    '/categories/:id': Ideas,
    
    // // Artists
    // '/artists': Artists,
    // '/create-artist': CreateArtist,
}