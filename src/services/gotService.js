export default class GotApi {
  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }

  async getResource(url) {
    const r = await fetch(`${this._apiBase}${url}`);

    if (!r.ok) {
      throw new Error(`Could not fetch ${url}, received ${r.status}`);
    }

    return await r.json();
  }

  async getAllCharacters() {
    const result = await this.getResource('/characters?page=5&pageSize=10');
    return result.map(this._transformCharacter);
  }

  getAllBooks() {
    return this.getResource('/books');
  }

  getAllHouses() {
    return this.getResource('/houses');
  }

  async getCharacter(id) {
    const character = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(character);
  }

  getHouse(id) {
    return this.getResource(`/houses/${id}`);
  }

  getBook(id) {
    return this.getResource(`/books/${id}`);
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

