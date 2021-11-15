export default class GotApi {
  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }

  getResource = async (url) => {
    const r = await fetch(`${this._apiBase}${url}`);

    if (!r.ok) {
      throw new Error(`Could not fetch ${url}, received ${r.status}`);
    }

    return await r.json();
  }

  getAllCharacters = async  () => {
    const result = await this.getResource('/characters?page=5&pageSize=10');
    return result.map(this._transformCharacter);
  }

  getAllBooks = () => {
    return this.getResource('/books');
  }

  getAllHouses = () => {
    return this.getResource('/houses');
  }

   getCharacter = async (id) => {
    const character = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(character);
  }

  getHouse = async (id) => {
    const house = await this.getResource(`/houses/${id}`);
    return this._transformHouse(house);
  }

  getBook = async (id) => {
    const book = await this.getResource(`/books/${id}`);
    return this._transformBook(book);
  }

  _transformCharacter(char) {
    return {
      name: char.name,
      gender: char.gender,
      born: char.born,
      died: char.died,
      culture: char.culture
    }
  }

  _transformHouse(house) {
    return {
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons
    }
  }

  _transformBook(book) {
    return {
      name: book.name,
      numberOfPages: book.numberOfPages,
      publisher: book.publisher,
      released: book.released,
    }
  }
}

