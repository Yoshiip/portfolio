<script>
// @ts-nocheck

    import tools from '$lib/tools.json'
</script>

<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/skills.css">
<title>Compétences • Tourneur Aymeri</title>
<main>
    <h1>Compétences</h1>
    <div class="skills_container">
        {#each Object.keys(tools) as tool}
            <div class="skill">
                {#if Object.hasOwn(tools[tool], "icon")}
                    <img src={"/images/tools/" + tools[tool].icon} alt="" srcset="">
                {:else}
                    <img src={"/images/tools/" + tool + ".svg"} alt="" srcset="">
                {/if}
                <h1>{tools[tool].name}</h1>
                <p>{tools[tool].description}</p>
                <p>Projets liés: ...</p>
            </div>
        {/each}

    </div>
</main>