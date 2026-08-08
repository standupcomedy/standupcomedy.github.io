Module.modal = Module.modal || {}
Module.modal.user = `
  <section class="user">
    <div class="user-header">
      <figure>
        <img src="" onerror="this.style.opacity=0;">
      </figure>
      <dl>
        <dt>なまえなまえ</dt>
        <dd>
          <a href=""><i class="fa-brands fa-youtube"></i></a>
          <a href=""><i class="fa-brands fa-instagram"></i></a>
          <a href=""><i class="fa-brands fa-tiktok"></i></a>
          <a href=""><i class="fa-brands fa-x-twitter"></i></a>
        </dd>
      </dl>
    </div>

    <div class="voice user-content">
      <ul>
        <li>
          <div>
            <p>これはテストこれはテストこれはテストこれはテストこれはテストこれはテストこれはテストこれはテスト</p>
            <span>2026-8-8 13:03</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="calendar user-content" data-view="list">
      <ul class="calendar-days">
        <li data-ymd="20260807">
          <div class="calendar-date" data-day="7">
            <span class="calendar-month">8<span class="calendar-date-unit">月</span></span>
            <span class="calendar-day">7<span class="calendar-date-unit">日</span></span>
            <span class="calendar-weekday">(金)</span>
          </div>
          <div class="js-calendar-event"></div>
        </li>
        <li data-ymd="20260808">
          <div class="calendar-date" data-day="8">
            <span class="calendar-month">8<span class="calendar-date-unit">月</span></span>
            <span class="calendar-day">8<span class="calendar-date-unit">日</span></span>
            <span class="calendar-weekday">(金)</span>
          </div>
          <div class="js-calendar-event"></div>
        </li>
        <li data-ymd="20260809">
          <div class="calendar-date" data-day="9">
            <span class="calendar-month">8<span class="calendar-date-unit">月</span></span>
            <span class="calendar-day">9<span class="calendar-date-unit">日</span></span>
            <span class="calendar-weekday">(金)</span>
          </div>
          <div class="js-calendar-event"></div>
        </li>
      </ul>
    </div>

    <div class="voice user-content">
      <ul>
        <li>
          <div>
            <p>これはテストこれはテストこれはテストこれはテストこれはテストこれはテストこれはテストこれはテスト</p>
            <span>2026-8-8 13:03</span>
          </div>
        </li>
        <li>
          <div>
            <p>これはテストこれはテストこれはテストこれはテストこれはテストこれはテストこれはテストこれはテスト</p>
            <span>2026-8-8 13:03</span>
          </div>
        </li>
      </ul>
    </div>

    <nav class="user-nav-outer">
      <div class="user-nav">
        <button type="button" class="js-user-view" value="user">フォローする</button>
      </div>
    </nav>
  </section>
`