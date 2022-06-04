<script>
</script>

<main>
  <div class="container">
    <div class="row">
      <h1>Documentation</h1>
      <h2>Projektbeschreibung</h2>
      <p>
        Diese Webseite soll es dem Benutzer erleichtern, seine Ideen jeglicher Art zu speichern. Um ähnliche Ideen zu gruppieren können
        diese einer Kategorie zugewiesen werden. So kann zum Beispiel zwischen Ausflugsideen für die Freundesgruppe und den Filmen die man
        noch sehen möchte unterschieden werden.
      </p>
      <p>
        Um ähnliche Ideen innerhalb einer Kategorie weiter zu gruppieren, können diese mit mehreren, für einer Kategorie einzigarten, Tags
        versehen werden. Nach diesen Tags soll dann ebenfalls gefiltert werden können.
      </p>
    </div>
    <div class="row">
      <h2>ERD - Entity Relationship Diagram</h2>
      <img src="/images/ERD.png" class="img-fluid" alt="ERD" />
      <p>
        Implementiert wurden nur die drei Entitäten <b>Idea</b>, <b>Category</b> und <b>Tags</b>. Die beiden Entitäten <b>Group</b> und
        <b>User</b> sind in dieser Version der Webseite nicht implementiert. Mit diesen beiden Enitäten könnte die Webseite für mehrere User
        zugänglich gemacht werden, damit nicht nur jemand seine Ideen eintragen kann. Zusätzlich könnten Ideen einer Gruppe von mehreren Benutzern
        zugewiesen werden, um es so zum Beispiel der Freundesgruppe zu ermöglichen, eigene Ideen einzutragen beziehungsweise vorzuschlagen.
      </p>
    </div>
    <div class="row">
      <h2>Mockups</h2>
      <img src="/images/Mockups.png" class="img-fluid" alt="mockups" />
      <p>
        Um eine vage Vorstellung zu haben, wie die Webseite designed werden könnte, habe ich basierend auf dem ERD einige Mockups entworfen.
      </p>
    </div>
    <div class="row">
      <h2>Screenshots der Webseite</h2>
      <div id="carouselExampleCaptions" class="carousel carousel-dark slide" data-bs-ride="false">
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2" />
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3" />
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4" />
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5" />
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="/images/screenshot_categories.png" class="d-block w-100" alt="categories" />
            <div class="carousel-caption d-none d-md-block transparent">
              <h5>Einstiegsseite der Webseite. Dem Benutzer werden alle bereits erstellten Kategorieren angezeigt.</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="/images/screenshot_addcategory.png" class="d-block w-100" alt="addcategory" />
            <div class="carousel-caption d-none d-md-block transparent">
              <h5>Neue Kategorie erstellen</h5>
              <p>Über den Button <b>Add category</b> kann der Benutzer eine neue Kategorie hinzufügen.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="/images/screenshot_ideas.png" class="d-block w-100" alt="ideas" />
            <div class="carousel-caption d-none d-md-block transparent">
              <h5>Liste aller Ideen</h5>
              <p>Wenn der Benutzer eine Kategorie auswählt, werden ihm alle vorhandenen Ideen innerhalb der Kategorie angezeigt.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="/images/screenshot_addidea.png" class="d-block w-100" alt="addidea" />
            <div class="carousel-caption d-none d-md-block transparent">
              <h5>Neue Idee erstellen</h5>
              <p>
                Mit einem Klick auf den Button <b>Add idea</b> kann eine neue Idee hinzugefügt und die passenden Tags zugewiesen werden.
              </p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="/images/screenshot_managetags.png" class="d-block w-100" alt="ideas" />
            <div class="carousel-caption d-none d-md-block transparent">
              <h5>Tags verwalten</h5>
              <p>Über <b>Manage tags</b> können neue Tags erstellt und existierende editiert oder gelöscht werden.</p>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true" />
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true" />
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <div class="row">
      <h2>Technologien</h2>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Technologie</th>
            <th scope="col">Nutzen</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Bootstrap</td>
            <td>Design der Webseite</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Svelte</td>
            <td>JS Web Framework</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Node.js</td>
            <td>Abhängigkeit von Svelte und Backend</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Express.js</td>
            <td>Web Framework für Node.js</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Axios</td>
            <td>HTTP Client für Node.js</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>Dotenv</td>
            <td>Auslagern der Konfigurationsinformationen</td>
          </tr>
          <tr>
            <th scope="row">7</th>
            <td>MongoDB</td>
            <td>NoSQL Datenbank um Daten zu speichern</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</main>

<style>
  .transparent {
    background-color: rgba(100, 100, 100, 0.75);
    color: white;
  }
  .carousel-item {
    height: 650px;
  }
  .carousel-item img {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 650px;
  }
  .carousel-control-prev span,
  .carousel-control-next span {
    background-color: rgba(100, 100, 100, 0.75);
  }
</style>
