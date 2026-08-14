const people = {
  byeong: {
    name: "Byeong Yoon",
    letter: `<p>Thank you for being part of these days in Jember.</p><p>I hope you remember the small things as much as the big ones — the project, the conversations, the laughs, and all the moments we didn't plan.</p><p>Even if we go back to our own countries and our own lives, I'm really glad our paths crossed here.</p><p>Take care, and let's meet again someday.</p>`
  },
  jueun: {
    name: "Jueun",
    letter: `<p>Thank you for making these days brighter and more memorable.</p><p>What started as a project became something much more personal: a memory I know I'll look back on and smile about.</p><p>I hope you take a little piece of Jember with you — not just in your photos, but in your memories.</p><p>Until we meet again.</p>`
  },
  sooah: {
    name: "Soo Ah",
    letter: `<p>It feels strange knowing that tomorrow you'll be going home.</p><p>There are probably a hundred little things we could say, but maybe the simplest one is enough: thank you.</p><p>Thank you for being here, for sharing your time, and for becoming part of a chapter I'll remember for a long time.</p><p>Don't let the distance make this memory feel small.</p>`
  },
  donggyun: {
    name: "Donggyun",
    letter: `<p>I'm really glad we got to meet here in Jember.</p><p>Maybe years from now, we won't remember every conversation or every day. But I hope we'll remember how it felt to be here together.</p><p>Thank you for being part of this chapter. I hope one day we can look back at this website and laugh about how young we were.</p><p>See you again, somewhere in the world.</p>`
  }
};

const modal = document.getElementById("personModal");
const modalName = document.getElementById("modalName");
const modalLetter = document.getElementById("modalLetter");

document.querySelectorAll(".person-card").forEach(card => {
  card.addEventListener("click", () => {
    const person = people[card.dataset.person];
    modalName.textContent = person.name;
    modalLetter.innerHTML = person.letter;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("lock");
  });
});
function closeModal(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  document.body.classList.remove("lock");
}
document.getElementById("closeModal").addEventListener("click", closeModal);
document.querySelector(".modal-backdrop").addEventListener("click", closeModal);
document.addEventListener("keydown", e => { if(e.key === "Escape") closeModal(); });

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add("visible");
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  document.getElementById("progressBar").style.width = `${(scrollY/max)*100}%`;
});

const audio = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const musicText = document.getElementById("musicText");
let playing = false;
musicBtn.addEventListener("click", async () => {
  if(!playing){
    try { await audio.play(); playing=true; musicText.textContent="Pause"; }
    catch(e){ musicText.textContent="Add MP3"; }
  } else {
    audio.pause(); playing=false; musicText.textContent="Music";
  }
});

document.getElementById("memoryBtn").addEventListener("click", async () => {
  const memory = document.querySelector(".memory-center");
  memory.innerHTML = `<p class="eyebrow">PLAYING YOUR MEMORY</p><h2>Replace this screen<br>with your video.</h2><p>Put your MP4 inside assets/ and edit this section in index.html.</p>`;
  memory.style.animation = "fadeIn .8s ease";
  if(!playing){
    try { await audio.play(); playing=true; musicText.textContent="Pause"; } catch(e){}
  }
});

document.getElementById("rememberBtn").addEventListener("click", () => {
  localStorage.setItem("jemberMemorySaved","true");
  const toast=document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),2500);
});
